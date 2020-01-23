package app

import (
	"time"

	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

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

// Model -
type Model interface {
	insertRoom(id, building string) error
	addRoomEvents(id string, events []Event) error
	getBuilding(id string) (Building, error)
	getRooms(building string) ([]Room, error)
	floorFromRoom(id, building string) (int, error)
}

// MongoModel -
type MongoModel struct {
	DB *mgo.Database
}

// NewMongoModel -
func NewMongoModel(db *mgo.Database) Model {
	return MongoModel{DB: db}
}

func (model MongoModel) insertRoom(id, building string) error {
	c := model.DB.C("rooms")
	floor, err := model.floorFromRoom(id, building)
	if err != nil {
		return err
	}

	r := &Room{
		ID:       id,
		Building: building,
		Floor:    floor,
		Events:   []Event{},
	}
	s := bson.M{"id": id}
	_, err = c.Upsert(s, r)
	return err
}

func (model MongoModel) addRoomEvents(id string, events []Event) error {
	c := model.DB.C("rooms")
	_, err := c.Upsert(
		bson.M{"id": id},
		bson.M{
			"$push": bson.M{
				"events": bson.M{
					"$each": events,
				},
			},
		},
	)
	return err
}

func (model MongoModel) getBuilding(id string) (Building, error) {
	c := model.DB.C("rooms")
	var rooms []Room
	err := c.Find(bson.M{"building": id}).Sort("floor", "id").All(&rooms)
	return Building{rooms}, err
}

func (model MongoModel) getRooms(building string) ([]Room, error) {
	c := model.DB.C("rooms")
	var rooms []Room
	err := c.Find(bson.M{"building": building}).All(&rooms)
	return rooms, err
}

func (model MongoModel) floorFromRoom(id, building string) (int, error) {
	conf, err := readRoomConf()
	if err != nil {
		return 0, err
	}
	return conf[building][id].Floor, nil
}
