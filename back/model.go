package main

import (
	"sort"
	"time"

	"gopkg.in/mgo.v2/bson"
)

const (
	buildNDC = "NDC"
	buildNDL = "NDL"
)

func (a *App) addRoom(id, building string) (Room, error) {
	c := a.DB.C("rooms")
	floor := getRoomFloor(building, id)
	r := &Room{
		ID:       id,
		Building: building,
		Floor:    floor,
		Events:   []Event{},
	}
	s := bson.M{"id": id}
	_, err := c.Upsert(s, r)
	return *r, err
}

func (a *App) addEvent(roomID string, e []Event) {
	c := a.DB.C("rooms")
	c.Upsert(bson.M{"id": roomID}, bson.M{"$push": bson.M{
		"events": bson.M{
			"$each": e,
		},
	},
	})
}

func (a *App) getBuilding(id string) (Building, error) {
	c := a.DB.C("rooms")
	var rooms = []Room{}
	err := c.Find(bson.M{"building": id}).Sort("floor", "id").All(&rooms)
	return Building{rooms}, err
}

func (a *App) updateCalendars(conf roomConfObj, b string) {
	for rid, r := range conf[b] {
		events := getEvents(b, rid, r.URLID)
		a.addRoom(rid, b)
		eventsToAdd := EventList{}
		for _, e := range events {
			checkTime := e.Start.Before(time.Now().Truncate(24*time.Hour).AddDate(0, 0, 7)) && e.Start.After(time.Now())
			if e.Summary != "Férié" && checkTime {
				ev := Event{
					Name:        e.Summary,
					Description: e.Description,
					Location:    e.Location,
					Time:        TimeDuration{e.Start.Unix(), e.End.Unix()},
				}
				eventsToAdd = append(eventsToAdd, ev)
			}
		}
		sort.Sort(eventsToAdd)
		a.addEvent(rid, eventsToAdd)
		println("updating " + rid + " done")
	}
}
