back:
	cd api && GOOS=linux GOARCH=arm GOARM=7 go build

front:
	API_URL=http://free-room-isep.ddns.net/api
	cd client && npm run build

all: back front
