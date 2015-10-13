#Servidor

Repositorio del servidor para la aplicación Raven de Gestión de Proyecto Software 2015/16 de Unizar.

# Arrancar servidor mediante npm
Para iniciar el servidor mediante npm hay que realizar los siguientes pasos:

1. Configurar el fichero /config/conf.json, con el puerto del servidor, la URL de mongoDB y su puerto:
2. Instalar las dependencias mediante:

	```
	$> npm install
	```
	
3. Pasar los test para comprobar si todo es correcto. (Esta acción puede añadir basura a la BBDD):

	```
	$> npm test
	```
	
4. Arrancar el servidor

	```
	$> node app.js
	```
