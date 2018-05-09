package app

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
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

func (a *App) updateCalendars(conf roomConfig, b string) {
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

type roomConf struct {
	Floor int    `json:"floor"`
	URLID string `json:"urlId"`
}

type roomConfig map[string]map[string]roomConf

func readRoomConf() roomConfig {
	c, err := ioutil.ReadFile("conf/rooms.json")
	if err != nil {
		log.Fatalf("File rooms.json cannot be read: %v", err)
	}
	var conf roomConfig
	err = json.Unmarshal(c, &conf)
	if err != nil {
		log.Fatalf("Error reading room conf: %v", err)
	}
	return conf
}

func getRoomFloor(building, id string) int {
	conf := readRoomConf()
	return conf[building][id].Floor
}

func getEvents(building, roomID, urlID string) []gocal.Event {
	url := fmt.Sprintf(
		"http://planning.isep.fr/Telechargements/ical/EdT_%s.ics?version=13.0.2.1&idICal=%s&param=643d5b312e2e36325d2666683d3126663d31",
		roomID, urlID,
	)
	res, err := http.Get(url)
	if err != nil {
		log.Printf("Cannot get calendar for room %s in building %s: %v", roomID, building, err)
	}
	defer res.Body.Close()

	c := gocal.NewParser(res.Body)
	c.Parse()
	return c.Events
}
