package app

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
)

// Create a json error response
func resError(w http.ResponseWriter, code int, message string) {
	resJSON(w, code, map[string]string{"error": message})
}

// Create a json response with 200 ok status code
func resOK(w http.ResponseWriter, payload interface{}) {
	resJSON(w, http.StatusOK, payload)
}

// Create a json response
func resJSON(w http.ResponseWriter, code int, payload interface{}) {
	response, _ := json.Marshal(payload)
	w.Header().Set("Content-Type", "application/json;charset=utf-8")
	w.WriteHeader(code)
	w.Write(response)
}

// Read mux router route params
func reqParam(r *http.Request, p string) string {
	vars := mux.Vars(r)
	return vars[p]
}
