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

    // Funcion para loguear al usuario en el sistema
    app.post('/loginUser', function(req, res){
      var json = req.body;
      if (json.email == undefined || json.pass == undefined) res.sendStatus(400);
      else{
          //Comprobamos si recibimos err si es asi enviamos status 400
          //  si no hay error comprobamos si el usuario es null o no
          // si no es null enviamos 200 si es null 400 como que la contraseña
          // y el usuario no coinciden
          users.login(json, function(err, user) {
            if (err == null) {
              if(user == null) {
                res.sendStatus(400);
              } else {
                res.sendStatus(200);
              }
            } else res.sendStatus(400);
          });
      }
    });
}
