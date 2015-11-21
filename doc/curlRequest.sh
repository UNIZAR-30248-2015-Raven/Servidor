#!/bin/bash
URL="http://raven-sirbargus.rhcloud.com/"
#URL="localhost:8080/"

echo "GET $URL"
curl -I $URL
echo ""
echo "-------------------------------------------"
aux=$URL"createUser"
echo "POST $aux"
curl -H "Content-Type: application/json" -X POST -d '{"tlf":"test","email":"test","pass":"as","nombre":"test","apellido":"test","nacimiento":"0","info":"0","residencia":"0","contactoNombre":"0","contactoApellido":"test","contactoTelefono":"12"}' $aux
echo ""
echo "------------------------------------------"
aux=$URL"loginUser"
echo "POST $aux"
curl -H "Content-Type: application/json" -X POST -d '{"email":"test","pass":"as"}' $aux
echo ""
echo "------------------------------------------"
aux=$URL"loginUser"
curl -H "Content-Type: application/json" -X POST -d '{"email":"test","pass":"SADFADF"}' $aux
echo ""
echo "------------------------------------------"
aux=$URL"findUser/test"
echo "GET $aux"
curl $aux
echo ""
echo "------------------------------------------"
aux=$URL"createEvent"
echo "POST $aux"
curl -H "Content-Type: application/json" -X POST -d '{"id_event":"dd","texto":"txt","periodicidad":"2","email":"rgcmb@hotmail.com"}' $aux

