package main

import "os"

func main() {
	a := App{}
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
