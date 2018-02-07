package app

import (
	"log"
	"sort"
	"time"
)

const (
	buildNDC = "NDC"
	buildNDL = "NDL"
)

// Donne le nombre total de salles d'un batiment
// ainsi que le nombre de salles disponibles
func (a *App) getBuildingInfos(id string) (BuildingInfo, error) {
	var bInfos BuildingInfo
	rooms, err := a.Model.getRooms(id)
	if err != nil {
		return bInfos, err
	}

	now := time.Now().Unix() * 1000
	notDisp := 0
	for _, room := range rooms {
		for _, event := range room.Events {
			if now > event.Time.Start && now < event.Time.End {
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
		a.Model.insertRoom(rid, b)

		now := time.Now()
		currentDate := now.Truncate(24 * time.Hour)

		eventsToAdd := []Event{}
		for _, e := range events {
			timeOffset := time.Now().Truncate(24*time.Hour).AddDate(0, 0, 7)
			isTimeInBounds := e.Start.After(currentDate) && e.Start.Before(timeOffset)
			if e.Summary != "Férié" && isTimeInBounds {
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

		a.Model.addRoomEvents(rid, eventsToAdd)
		log.Printf("updating %s done", rid)
	}
}
