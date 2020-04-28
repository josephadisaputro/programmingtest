var express = require('express');
var bodyParser = require("body-parser");
var mysql = require('mysql');
var path = require('path');
var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

var http = require('http').Server(app);
var port = process.env.PORT || 3000;

/* 
 *  all mysql's pool 
 *  all needed connections
 */
var pooltest = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "edihub4265",
    database: "teravintestdb"
});
pooltest.connect(function (err) {
    if (err) throw err;
});

app.get('/', function (req, res) {
    pooltest.query("SELECT COUNT(*) as count FROM users", function (err, result, fields) {
        if (err) throw err;
        console.log("Successfully processing query SELECT on table users");
        //console.log(result[0].count);
        //console.log(fields);
        if (result[0].count == 0) {
            res.render('listuser', { events: 'nothing' });
        }
    });

    pooltest.query("SELECT Nama, Email FROM users", function (err, result, fields) {
        if (err) throw err;
        console.log("Successfully processing query SELECT on table users");
        //console.log(result[0].count);
        //console.log(fields);
        res.render('listuser', { events: result, fields: fields });
    });
});

app.post('/create', function (req, res) {
    res.render('createuser');
});

app.get('/createuser', function (req, res) {
    var name = req.query.nama;
    var phone = req.query.phone;
    var email = req.query.email;
    var address = req.query.alamat;
    //console.log(name);
    var querystatement = "INSERT INTO users (Nama , Nohp , Email , Alamat) VALUES('" + name + "', '" + phone + "', '" + email + "', '" + address + "') ";
    pooltest.query(querystatement, function (err, result, fields) {
        if (err) throw err;
        console.log("Successfully processing query INSERT on table users");
        console.log(result);
    });
    res.redirect('/');
});

app.get('/search', function (req, res) {
    var name = req.query.nama;
    //console.log(name);
    var querystatement = "SELECT Nama, Email FROM users WHERE Nama LIKE '%" + name +"%' ";
    pooltest.query(querystatement, function (err, result, fields) {
        if (err) throw err;
        console.log("Successfully processing query SELECT on table users");
        console.log(result);
        res.render('listuser', { events: result, fields: fields });
    });
});


app.get('/sort_down_Nama', function (req, res) {
    var name = req.query.nama;
    //console.log(name);
    var querystatement = "SELECT Nama, Email FROM users ORDER BY Nama DESC;";
    pooltest.query(querystatement, function (err, result, fields) {
        if (err) throw err;
        console.log("Successfully processing query SELECT on table users");
        console.log(result);
        res.render('listuser', { events: result, fields: fields });
    });
});

app.get('/sort_up_Nama', function (req, res) {
    var name = req.query.nama;
    //console.log(name);
    var querystatement = "SELECT Nama, Email FROM users ORDER BY Nama;";
    pooltest.query(querystatement, function (err, result, fields) {
        if (err) throw err;
        console.log("Successfully processing query SELECT on table users");
        console.log(result);
        res.render('listuser', { events: result, fields: fields });
    });
});

app.get('/sort_up_Email', function (req, res) {
    var name = req.query.nama;
    //console.log(name);
    var querystatement = "SELECT Nama, Email FROM users ORDER BY Email;";
    pooltest.query(querystatement, function (err, result, fields) {
        if (err) throw err;
        console.log("Successfully processing query SELECT on table users");
        console.log(result);
        res.render('listuser', { events: result, fields: fields });
    });
});

app.get('/sort_down_Email', function (req, res) {
    var name = req.query.nama;
    //console.log(name);
    var querystatement = "SELECT Nama, Email FROM users ORDER BY Email DESC;";
    pooltest.query(querystatement, function (err, result, fields) {
        if (err) throw err;
        console.log("Successfully processing query SELECT on table users");
        console.log(result);
        res.render('listuser', { events: result, fields: fields });
    });
});

http.listen(port, function () {
    console.log('listening on *:' + port);
});