#!/bin/bash
URL="http://raven-sirbargus.rhcloud.com/"
#URL="localhost:8080/"

echo "GET $URL"
curl -I $URL
echo ""
echo "-------------------------------------------"
aux=$URL"createUser"
echo "POST $aux"
curl -X POST $aux -d "tlf":"test","email":"test","pass":"as","nombre":"test","apellido":"test","nacimiento":"0","info":"0","residencia":"0","contactoNombre":"0","contactoApellido":"test","contactoTelefono":"12"
