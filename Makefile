VERSION ?= 0.0.1-beta

back:
	cd api && GOOS=linux GOARCH=arm GOARM=7 go build -o build/api_$(VERSION)

front:
	cd client && npm run build:pi

all: back front
