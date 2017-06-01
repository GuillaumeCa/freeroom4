package main

import (
	"fmt"
	"log"
	"net/http"

	mgo "gopkg.in/mgo.v2"
	cron "gopkg.in/robfig/cron.v2"

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
	a.initializeCronCalendar()
}

// Run -
func (a *App) Run(addr string) {
	fmt.Printf("Server started at %s...\n", addr)
	log.Fatal(http.ListenAndServe(addr, a.Router))
}

func (a *App) initializeRoutes() {
	r := a.Router
	r.HandleFunc("/building/{name:(?:NDC|NDL)}", a.getBuildingHandler).Methods("GET")
	r.HandleFunc("/update/cal", a.testGetCalHandler).Methods("GET")
}

func (a *App) initializeCronCalendar() {
	c := cron.New()
	c.AddFunc("17 1 * * *", func() {
		c := readRoomConf()
		a.updateCalendars(c, buildNDC)
		a.updateCalendars(c, buildNDL)
	})
	c.Start()
}
