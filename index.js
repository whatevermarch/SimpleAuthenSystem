// index.js
// load the things we need
var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var db = require('./db');

var app = express();

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// set the view engine to ejs
app.set('view engine', 'ejs');
const saltRounds = 10;

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
    res.render("pages/menu", { result: 0 });
});

app.get('/register', function(req, res) {
    res.render("pages/regis");
});

app.post('/register', function(req, res) {
    db.query(req.body.e_mail, function(isBlank, entry){
        if(!isBlank) res.render("pages/menu", { result: 4 });
        else{
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                if(err) throw err;
                db.insert(req.body.e_mail, hash);
                res.render("pages/menu", { result: 3 });
            });
        }
    });
});

app.get('/login', function(req, res){
    res.render("pages/login");
});

app.post('/login', function(req, res){
    db.query(req.body.e_mail, function(isBlank, entry){
        if(isBlank) res.render("pages/menu", { result: 2 });
        else{
            bcrypt.compare(req.body.password, entry.pass, function(err, result) {
                if(err) throw err;
                if(result==true){
                    res.render("pages/menu", { result: 1 });
                }
                else if(result==false){
                    res.render("pages/menu", { result: 2 });
                }
            });
        }
    });
    // console.log('entry : \n' + entry);
});

app.listen(8080, '127.0.0.1');
console.log('8080 is the magic port');