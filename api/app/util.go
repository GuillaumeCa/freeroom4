package app

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/apognu/gocal"
	"github.com/gorilla/mux"
)

// Create a json error response
func resError(w http.ResponseWriter, code int, message string) {
	resJSON(w, code, map[string]string{"error": message})
}

// Create a json response with 200 ok status code
func resOK(w http.ResponseWriter, payload interface{}) {
	resJSON(w, http.StatusOK, payload)
}

// Create a json response
func resJSON(w http.ResponseWriter, code int, payload interface{}) {
	response, _ := json.Marshal(payload)
	w.Header().Set("Content-Type", "application/json;charset=utf-8")
	w.WriteHeader(code)
	w.Write(response)
}

// Read mux router route params
func reqParam(r *http.Request, p string) string {
	vars := mux.Vars(r)
	return vars[p]
}

type roomConf struct {
	Floor int    `json:"floor"`
	URLID string `json:"urlId"`
}

type roomConfObj map[string]map[string]roomConf

func readRoomConf() roomConfObj {
	c, err := ioutil.ReadFile("conf/rooms.json")
	if err != nil {
		log.Fatalf("File rooms.json cannot be read: %v", err)
	}
	var conf roomConfObj
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
		log.Fatalf("Cannot get calendar for room %s: %s", roomID, err.Error())
	}
	defer res.Body.Close()

	c := gocal.NewParser(res.Body)
	c.Parse()
	return c.Events
}
