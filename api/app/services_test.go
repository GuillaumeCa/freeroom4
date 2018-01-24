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
				Start: now.Add(-10*time.Minute).Unix() * 1000,
				End:   now.Add(time.Hour).Unix() * 1000,
			},
		},
		Event{
			Name: "Test 2",
			Time: TimeDuration{
				Start: now.Add(13*time.Hour).Unix() * 1000,
				End:   now.Add(15*time.Hour).Unix() * 1000,
			},
		},
	}

	app := App{Model: testModel{
		rooms: []Room{
			Room{ID: "N16", Building: "NDC", Events: events},
			Room{ID: "N15", Building: "NDC", Events: []Event{}},
		},
	}}

	binfo, err := app.getBuildingInfos("NDC")
	if err != nil {
		t.Fatalf("got error: %v", err)
	}

	if binfo.FreeRooms != 1 {
		t.Fatalf("free room nb doesn't match expected %v, got: %v", 1, binfo.FreeRooms)
	}
	if binfo.TotalRooms != 2 {
		t.Fatalf("total room nb doesn't match expected %v, got: %v", 2, binfo.TotalRooms)
	}
}
