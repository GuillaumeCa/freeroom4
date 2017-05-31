package main

import "time"

type building struct {
	Rooms []room `json:"rooms"`
}

type room struct {
	ID       string  `json:"id"`
	Building string  `json:"building"`
	Floor    int     `json:"floor"`
	Events   []event `json:"events"`
}

type event struct {
	Name        string       `json:"name"`
	Location    string       `json:"location"`
	Description string       `json:"desc"`
	Time        timeDuration `json:"time"`
}

type eventList []event

func (slice eventList) Len() int {
	return len(slice)
}

func (slice eventList) Less(i, j int) bool {
	return slice[i].Time.Start.Before(slice[j].Time.Start)
}

func (slice eventList) Swap(i, j int) {
	slice[i], slice[j] = slice[j], slice[i]
}

type timeDuration struct {
	Start time.Time `json:"start"`
	End   time.Time `json:"end"`
}
