// This is the API of Freeroom (v4)
package main

import (
	"flag"
	"os"

	"github.com/GuillaumeCa/freeroom4/api/app"
)

var (
	listen = flag.String("listen", "0.0.0.0:8080", "HTTP listen address")
	dbName = flag.String("db-name", "freeroomv4", "Database name")
	dbHost = flag.String("db-host", "localhost", "Database host")
)

func main() {
	flag.Parse()

	a := app.App{}
	a.Initialize(
		getEnv("DB_HOST", *dbHost),
		// getEnv("DB_USERNAME", "root"),
		// getEnv("DB_PASSWORD", ""),
		getEnv("DB_NAME", *dbName),
	)
	a.Run(*listen)
}

func getEnv(e string, dft string) string {
	if env := os.Getenv(e); env != "" {
		return env
	}
	return dft
}
