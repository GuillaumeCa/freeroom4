package main

import (
	"fmt"
	"log"
	"net/http"

	mgo "gopkg.in/mgo.v2"

	"github.com/gorilla/mux"
)

// This is the API of Freeroom (v4)

// App -
type App struct {
	Router *mux.Router
	DB     *mgo.Database
}

// Initialize -
func (a *App) Initialize(dbname string) {
	session, err := mgo.Dial("localhost")
	if err != nil {
		panic(err)
	}
	a.DB = session.DB(dbname)

	a.Router = mux.NewRouter()
	a.initializeRoutes()

}

// Run -
func (a *App) Run(addr string) {
	fmt.Printf("Server started at %s...\n", addr)
	log.Fatal(http.ListenAndServe(addr, a.Router))
}

func (a *App) initializeRoutes() {
	r := a.Router
	r.HandleFunc("/building/{name:(?:NDC|NDL)}", a.getBuildingHandler).Methods("GET")
	r.HandleFunc("/", a.testHandler).Methods("GET")
	r.HandleFunc("/cal", a.testGetCalHandler).Methods("GET")
}
