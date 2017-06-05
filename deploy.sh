# API
echo "* BUILD API"
cd api
go build

echo "-> BUILD API FINISHED"
echo ""

echo "* RESTART API"
service supervisor restart
echo ""


export API_URL=http://free-room-isep.ddns.net/api

# front
echo "* BUILD FRONT"
cd ../client
npm install
npm run build
service apache2 reload

echo "-> BUILD FRONT FINISHED"
echo ""
