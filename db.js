var mariadb = require('mariasql');

var db = new mariadb();

var insert = function(in_email, in_pass){
    db.connect({
        host: '127.0.0.1',
        user: 'nodejs',
        password: 'r4e3w2q1',
        db: 'auth'
    });

    var prep = db.prepare('INSERT INTO users (email, pass) VALUES (:email, :pass)');

    db.query(prep({ email: in_email, pass: in_pass }), function(err, rows){
        if(err) throw err;
        console.log('1 record inserted!');
        db.end();
    });
};

var query = function(in_email, callback){
    db.connect({
        host: '127.0.0.1',
        user: 'nodejs',
        password: 'r4e3w2q1',
        db: 'auth'
    });

    var prep = db.prepare("SELECT * FROM users WHERE email=:email");

    db.query(prep({ email: in_email }), function(err, rows){
        if(err) throw err;
        if(rows.length <= 0) callback(true, {});
        else callback(false, rows[0]);
        db.end();
    });   
};

module.exports = {
    insert: insert,
    query: query
};