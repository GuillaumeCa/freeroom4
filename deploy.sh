# API
echo "* BUILD API"
cd api
GOOS=linux GOARCH=arm GOARM=7 go build
echo "DONE"
echo ""

API_URL=http://free-room-isep.ddns.net/api

# front
echo "* BUILD FRONT"
cd ../client
npm run build
