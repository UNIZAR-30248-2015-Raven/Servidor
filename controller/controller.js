//Controlador de peticiones
var utils = require('../utils/utils.js'),
    users = require('../model/users.js');

//Exportamos las funcioens
module.exports = function(app){
    //Funcion que comprueba que el servidor esta vivo, para probar los test
    app.get('/up', function(req, res){
        res.sendStatus(200);
    });

    //Funcion para la creacion del usuario
    app.post('/createUser', function(req,res){
       var json = req.body;
       json.timeStamp = Date.now();

       if(utils.haveUndefinedJSON(json)){
           res.sendStatus(406);
       } else{
           //ADD BBD
           users.add(json, function(err){
               if (err == null) res.sendStatus(200);
               else res.sendStatus(400);
           });
       }
    });
}
