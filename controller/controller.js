//Controlador de peticiones
var utils = require('../utils/utils.js'),
    users = require('../model/users.js');
    events = require('../model/events.js');
    crypto = require('crypto');

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

    app.post('/findUser', function(req, res){
        var json = req.body;
        if(json.email == undefined) res.sendStatus(400);
        users.find(json.email, function(err, user){
            if(err == null){
                if(user == null) res.sendStatus(400);
                else res.send(user);
            }else res.sendStatus(400);
        });
    });
    // Crea un evento
    // TO DO comprobar que todos los datos estén rellenados
    // generación dinámica de id_event o autoincremental
    // Se utiliza el email como campo que lo relaciona 
    // con el usuario que crea el evento
    // Investigar si utilizar email o token de session
    app.post('/createEvent', function(req, res) {
      var json = req.body;
      // Cambiar el id_event del que pasamos al autogenerado
      // Para que no haya id iguales seran el timestamp del momento de creado
      // mas el email del usuario que lo ha creado encriptado a md5
      // modificar los test para que puedas borrar un id que no sabes
      var id_event_encrypt = crypto.createHash('md5').update(new Date().getTime() + json.email).digest("hex");
      //console.log(id_event_encrypt);
      /**
       * Formato del Json
       * Sin periodicidad {id_event : "", texto : "texto", periodicidad : "0", day : "formato fecha", hour : "f hora", email : "email"}
       * Con periodicidad {id_event : "", texto : "texto", periodicidad : "L M X J V S D", hour : "f hora", email : "email"} 
       */
      if (json.texto == null || json.hour == null || 
          json.periodicidad == null || json.email == null) {
        res.sendStatus(400);
      } else {   
        json.id_event = id_event_encrypt; // To do modificar para id encryptada OK
        events.createEvent(json, function(err){
          if (err == null) res.sendStatus(200);
          else res.sendStatus(400);
        })
      }
    });
    // Para listar todos los eventos accederemos a esta direccion y pasaremos nuestro email
    app.get('/getEvents/:email', function(req, res) {
      if (req.params.email != null) {
        events.fetchEvents(req.params.email, function(err, eventsList) {
          if (err != null) {
            res.sendStatus(400);
          } else {
            if (eventsList == null) {
              res.sendStatus(400);
            } else {
              //console.log(eventsList);
              res.status(200).send(eventsList);
            }
          }
        })
      }
    })

    app.delete('/deleteEvent', function(req, res) {
      var json = req.body;
      //console.log(json.id_event);
      events.deleteEvent(json.id_event, json.email, function(err, op){
        if (err != null) {
          res.sendStatus(400);
        } else {
          if (op.n == 1) {
            res.sendStatus(200);
          } else {
            res.sendStatus(400);
          }
        }
      })
    })
}
