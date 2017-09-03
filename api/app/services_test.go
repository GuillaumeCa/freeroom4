package app

import (
	"testing"
	"time"
)

type testModel struct {
	rooms []Room
}

func (model testModel) insertRoom(id, building string) error {
	return nil
}

func (model testModel) addRoomEvents(id string, events []Event) {

}

func (model testModel) getBuilding(id string) (Building, error) {
	return Building{}, nil
}

func (model testModel) floorFromRoom(id, building string) int {
	return 0
}

func (model testModel) getRooms(building string) ([]Room, error) {
	return model.rooms, nil
}

func TestGetBuildingInfos(t *testing.T) {
	now := time.Now()

	events := []Event{
		Event{
			Name: "Test 1",
			Time: TimeDuration{
				Start: now.Add(time.Minute * -10).Unix(),
				End:   now.Add(time.Hour * 1).Unix(),
			},
		},
		Event{
			Name: "Test 2",
			Time: TimeDuration{
				Start: now.Add(time.Hour * 13).Unix(),
				End:   now.Add(time.Hour * 15).Unix(),
			},
		},
	}

	app := App{Model: testModel{
		rooms: []Room{
			Room{ID: "N16", Building: "NDC", Events: events},
			Room{ID: "N15", Building: "NDC", Events: events},
		},
	}}

	binfo, _ := app.getBuildingInfos("NDC")
	t.Log("retrieving free rooms (expect to be 1)")
	t.Log(binfo)
	if binfo.FreeRooms != 1 {
		t.Errorf("free room nb doesn't match")
		return
	}
	t.Log("retrieving total rooms nb (expect to be 2)")
	if binfo.TotalRooms != 2 {
		t.Errorf("total room nb doesn't match")
		return
	}
}
