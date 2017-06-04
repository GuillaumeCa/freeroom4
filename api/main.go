// This is the API of Freeroom (v4)
package main

import (
	"os"

	"github.com/GuillaumeCa/freeroom4/api/app"
)

func main() {
	a := app.App{}
	a.Initialize(
		// getEnv("DB_USERNAME", "root"),
		// getEnv("DB_PASSWORD", ""),
		getEnv("DB_NAME", "freeroomv4"),
	)
	a.Run(":8080")
}

func getEnv(e string, dft string) string {
	if env := os.Getenv(e); env != "" {
		return env
	}
	return dft
}
