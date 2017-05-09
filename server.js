/**
 * Created by Aula08-17 on 28/04/2017.
 */
// Set up
var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

// Configuration
mongoose.connect('mongodb://127.0.0.1/mean');

app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(cors());

var Usuario = mongoose.model('Usuario',{
    email: String,
    nombre:String
});

app.post('/api/usuarios/create', function(req, res) {
    var usuario = new Usuario(req.body);
    usuario.save(function(err,nuevoUsuario){
        if(err){
            res.send(err);
        }
        res.send(nuevoUsuario);
    });
});

app.get('/api/usuarios/read', function(req, res) {
    Usuario.find({},function(err,usuarios){
        if(err){
            res.send(err);
        }
        res.send(usuarios);
    });
});

app.put('/api/usuarios/update', function(req, res) {
    Usuario.findById(req.body._id, function (err, usuario) {  
    if (err) {
        res.status(500).send(err);
    } else {
        usuario.nombre = req.body.nombre || usuario.nombre;
        usuario.email = req.body.email || usuario.email;
        usuario.save(function (err, usuario) {
            if (err) {
                res.status(500).send(err)
            }
            res.send(usuario);
        });
    }
    });
});

app.delete('/api/usuarios/delete', function(req, res) {
    console.log(req.query);
    Usuario.findByIdAndRemove(req.query._id, function (err, usuario) {  
    var response = {
        message: "Usuario borrado",
        _id: usuario._id
    };
    res.send(response);
    });
});

// listen
app.listen(8080);
console.log("App listening on port 8080");