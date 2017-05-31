package main

import (
	"fmt"
	"sort"
	"time"

	"gopkg.in/mgo.v2/bson"
)

const (
	buildNDC = "NDC"
	buildNDL = "NDL"
)

func (a *App) createRoom(id, building string) (*room, error) {
	c := a.DB.C("rooms")
	floor := getRoomFloor(building, id)
	r := &room{
		ID:       id,
		Building: building,
		Floor:    floor,
		Events:   []event{},
	}
	s := bson.M{"id": id}
	_, err := c.Upsert(s, r)
	return r, err
}

func (a *App) addEvent(roomID string, e []event) {
	c := a.DB.C("rooms")
	c.Upsert(bson.M{"id": roomID}, bson.M{"$push": bson.M{
		"events": bson.M{
			"$each": e,
		},
	},
	})
}

func (a *App) getBuilding(id string) (building, error) {
	c := a.DB.C("rooms")
	var rooms = []room{}
	err := c.Find(bson.M{"building": id}).All(&rooms)
	return building{rooms}, err
}

func (a *App) updateCalendars() {
	conf := readRoomConf()
	for rid, r := range conf[buildNDC] {
		events := getEvents(buildNDC, rid, r.URLID)
		a.createRoom(rid, buildNDC)
		eventsToAdd := eventList{}
		for _, e := range events {
			checkTime := e.Start.Before(time.Now().AddDate(0, 0, 3)) && e.Start.After(time.Now())
			if e.Summary != "Férié" && checkTime {
				ev := event{
					Name:        e.Summary,
					Description: e.Description,
					Location:    e.Location,
					Time:        timeDuration{*e.Start, *e.End},
				}
				eventsToAdd = append(eventsToAdd, ev)
			}
		}
		sort.Sort(eventsToAdd)
		fmt.Println(eventsToAdd)
		a.addEvent(rid, eventsToAdd)
		println("got " + rid)
	}
}
