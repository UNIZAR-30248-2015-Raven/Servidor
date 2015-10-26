//Controlador de peticiones
var utils = require('../utils/utils.js'),
    users = require('../model/users.js');

//Exportamos las funcioens
module.exports = function(app){
    //Funcion que comprueba que el servidor esta vivo, para probar los test
    app.get('/', function(req, res){
        res.sendStatus(200);
    });

    //Funcion para la creacion del usuario
    app.post('/createUser', function(req,res){
       var json = req.body;
       json.timeStamp = Date.now();

       users.add(json, function(err){
            if (err == null) res.sendStatus(200);
            else res.sendStatus(400);
       });
    });
}
