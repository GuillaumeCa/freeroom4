package app

import (
	"log"
	"net/http"
	"os"

	mgo "gopkg.in/mgo.v2"
	cron "gopkg.in/robfig/cron.v2"

	"github.com/gorilla/mux"
	"github.com/urfave/negroni"
)

// App -
type App struct {
	Router *mux.Router
	DB     *mgo.Database
	N      *negroni.Negroni
	Model  Model
}

type middleware func(http.ResponseWriter, *http.Request, http.HandlerFunc)

// Initialize -
func (a *App) Initialize(hostdb, dbname string, dlOnStart bool) {
	session, err := mgo.Dial(hostdb)
	if err != nil {
		log.Fatalf("could not connect to mongo database: %v", err)
	}

	a.Model = NewMongoModel(session.DB(dbname))

	if dlOnStart {
		conf := readRoomConf()
		a.updateCalendars(conf, buildNDC)
		a.updateCalendars(conf, buildNDL)
	}

	a.N = negroni.New()
	a.Use(setupCors)

	a.Router = mux.NewRouter()

	a.initializeRoutes()
	a.initializeCronCalendar()

	a.N.UseHandler(a.Router)
}

// Run -
func (a *App) Run(addr string) {
	log.SetOutput(os.Stdout)
	log.Printf("Freeroom API started at %s...\n", addr)
	log.Fatal(http.ListenAndServe(addr, a.N))
}

// Use wrapper
func (a *App) Use(m middleware) {
	a.N.Use(negroni.HandlerFunc(m))
}

func (a *App) initializeRoutes() {
	r := a.Router
	r.HandleFunc("/building/{name:(?:NDC|NDL)}", a.getBuildingHandler).Methods("GET")
	r.HandleFunc("/building/{name:(?:NDC|NDL)}/infos", a.getBuildingInfosHandler).Methods("GET")
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

func setupCors(rw http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
	rw.Header().Set("Access-Control-Allow-Origin", "*")
	rw.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	if r.Method == "OPTIONS" {
		return
	}
	next(rw, r)
}
