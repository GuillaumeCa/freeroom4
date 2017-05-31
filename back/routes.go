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

func (a *App) testHandler(w http.ResponseWriter, r *http.Request) {
	ro, err := a.createRoom("N16B", buildNDC)
	if err != nil {
		resError(w, http.StatusInternalServerError, "Room cannot be created: "+err.Error())
		return
	}
	resOK(w, ro)
}

func (a *App) testGetCalHandler(w http.ResponseWriter, r *http.Request) {
	a.updateCalendars()
}
