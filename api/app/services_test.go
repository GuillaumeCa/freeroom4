package app

import "testing"

type testModel struct{}

func (model testModel) getRooms(building string) ([]Room, error) {
	return []Room{
		Room{},
	}, nil
}

func TestGetBuildingInfos(t *testing.T) {
	// app := App{Model: testModel{}}
}
