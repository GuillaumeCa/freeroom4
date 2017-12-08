VERSION ?= 0.0.2-beta

backrpi:
	cd api && GOOS=linux GOARCH=arm GOARM=7 go build -o build/api_$(VERSION)
	
frontrpi:
	cd client && npm run build:pi

	
back-docker:
	cd api && GOOS=linux go build -o build/api_$(VERSION)
	docker build -t freeroom4-api api/

front-docker:
	cd client && npm run build:docker
	docker build -t freeroom4-front client/


all: backrpi frontrpi
docker: back-docker front-docker
