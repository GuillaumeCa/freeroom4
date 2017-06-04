package app

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

// Donne le nombre total de salles d'un batiment
// ainsi que le nombre de salles disponibles
func (a *App) getBuildingInfos(id string) (BuildingInfo, error) {
	c := a.DB.C("rooms")
	var bInfos BuildingInfo
	var rooms []Room
	err := c.Find(bson.M{"building": id}).All(&rooms)

	tmstp := time.Now().Unix()
	notDisp := 0
	for _, room := range rooms {
		for _, event := range room.Events {
			if tmstp > event.Time.Start && tmstp < event.Time.End {
				notDisp++
			}
		}
	}

	bInfos = BuildingInfo{
		TotalRooms: len(rooms),
		FreeRooms:  len(rooms) - notDisp,
	}

	return bInfos, err
}

func (a *App) updateCalendars(conf roomConfObj, b string) {
	for rid, r := range conf[b] {
		events := getEvents(b, rid, r.URLID)
		a.addRoom(rid, b)
		eventsToAdd := []Event{}
		for _, e := range events {
			checkTime := e.Start.Before(time.Now().Truncate(24*time.Hour).AddDate(0, 0, 7)) && e.Start.After(time.Now())
			if e.Summary != "Férié" && checkTime {
				ev := Event{
					Name:        e.Summary,
					Description: e.Description,
					Location:    e.Location,
					Time:        TimeDuration{e.Start.Unix() * 1000, *e.Start, e.End.Unix() * 1000},
				}
				eventsToAdd = append(eventsToAdd, ev)
			}
		}
		sort.Slice(eventsToAdd, func(i, j int) bool {
			return eventsToAdd[i].Time.Start > eventsToAdd[j].Time.Start
		})
		a.addEvent(rid, eventsToAdd)
		println("updating " + rid + " done")
	}
}
