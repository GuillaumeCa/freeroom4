package app

import "time"

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

// TimeDuration défini la durée d'un évènement
// avec une date début et de fin
type TimeDuration struct {
	Start     int64     `json:"start"`
	StartDate time.Time `json:"startDate"`
	End       int64     `json:"end"`
}

// BuildingInfo -
type BuildingInfo struct {
	TotalRooms int `json:"totalRooms"`
	FreeRooms  int `json:"freeRooms"`
}
