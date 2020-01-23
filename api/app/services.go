package app

import (
	"fmt"
	"log"
	"net/http"
	"sort"
	"time"

	"github.com/apognu/gocal"
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

func (a *App) updateCalendars(conf roomConfig, building string) {
	for roomID, room := range conf[building] {
		a.updateRoom(building, roomID, room)
	}
}

func (a *App) updateRoom(building, roomID string, room roomConf) {
	events, err := getEvents(building, roomID, room.URLID)
	if err != nil {
		log.Printf("could not fetch events: %v", err)
		return
	}

	err = a.Model.insertRoom(roomID, building)
	if err != nil {
		log.Printf("could not insert room in database: %v", err)
		return
	}

	now := time.Now()
	currentDate := now.Truncate(24 * time.Hour)

	var eventsToAdd []Event
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

	err = a.Model.addRoomEvents(roomID, eventsToAdd)
	if err != nil {
		log.Printf("could not add room events to database: %v", err)
		return
	}

	log.Printf("updating of room %s done successfully", roomID)
}

func getEvents(building, roomID, urlID string) ([]gocal.Event, error) {
	url := fmt.Sprintf(
		"http://planning.isep.fr/Telechargements/ical/EdT_%s.ics?version=13.0.2.1&idICal=%s&param=643d5b312e2e36325d2666683d3126663d31",
		roomID, urlID,
	)
	client := &http.Client{Timeout: 30 * time.Second}
	res, err := client.Get(url)
	if err != nil {
		return nil, fmt.Errorf(
			"Cannot get calendar for room %s in building %s: %v",
			roomID, building, err,
		)
	}
	defer res.Body.Close()

	c := gocal.NewParser(res.Body)
	err = c.Parse()
	if err != nil {
		return nil, fmt.Errorf("Cannot parse calendar: %v", err)
	}

	return c.Events, nil
}
