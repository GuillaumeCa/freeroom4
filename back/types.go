package main

// Building défini un batiment et ses salles
type Building struct {
	Rooms []Room `json:"rooms"`
}

// Room défini une salle et ses évènements
type Room struct {
	ID       string  `json:"id"`
	Building string  `json:"building"`
	Floor    int     `json:"floor"`
	Events   []Event `json:"events"`
}

// Event -
type Event struct {
	Name        string       `json:"name"`
	Location    string       `json:"location"`
	Description string       `json:"desc"`
	Time        TimeDuration `json:"time"`
}

// EventList est une liste d'Event
type EventList []Event

func (slice EventList) Len() int {
	return len(slice)
}

func (slice EventList) Less(i, j int) bool {
	return slice[i].Time.Start < slice[j].Time.Start
}

func (slice EventList) Swap(i, j int) {
	slice[i], slice[j] = slice[j], slice[i]
}

// TimeDuration défini la durée d'un évènement
// avec une date début et de fin
type TimeDuration struct {
	Start int64 `json:"start"`
	End   int64 `json:"end"`
}
