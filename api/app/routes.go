package app

import "net/http"

func (a *App) getBuildingHandler(w http.ResponseWriter, r *http.Request) {
	b := reqParam(r, "name")
	res, err := a.Model.getBuilding(b)
	if err != nil {
		resError(w, http.StatusBadRequest, "This building doesn't exist")
		return
	}
	resOK(w, res)
}

func (a *App) getBuildingInfosHandler(w http.ResponseWriter, r *http.Request) {
	b := reqParam(r, "name")
	res, err := a.getBuildingInfos(b)
	if err != nil {
		resError(w, http.StatusBadRequest, "This building doesn't exist")
		return
	}
	resOK(w, res)
}
