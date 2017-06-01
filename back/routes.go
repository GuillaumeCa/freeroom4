package main

import "net/http"

func (a *App) getBuildingHandler(w http.ResponseWriter, r *http.Request) {
	b := reqParam(r, "name")
	res, err := a.getBuilding(b)
	if err != nil {
		resError(w, http.StatusBadRequest, "This building doesn't exist")
		return
	}
	resOK(w, res)
}

func (a *App) testGetCalHandler(w http.ResponseWriter, r *http.Request) {
	c := readRoomConf()
	a.updateCalendars(c, buildNDC)
	a.updateCalendars(c, buildNDL)
}
