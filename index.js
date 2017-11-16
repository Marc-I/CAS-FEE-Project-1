'use strict';
const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const io = require('socket.io')(http);
const db = require('./server/db.js');

const hostname = '127.0.0.1';
const port = 3119;

let openClients = 0;
io.on('connection', (socket) => {
    openClients++;
    console.log(`connection to client opened (currently ${openClients} client${openClients != 1 ? 's' : ''} connected)`);

    //socket.on('send', (msg) => {
    //    console.log('message: ' + msg);
    //});

    socket.on('disconnect', (msg) => {
        openClients--;
        console.log(`connection to client closed (currently ${openClients} client${openClients != 1 ? 's' : ''} connected)`);
    });
});

app.get('/', express.static(__dirname));
app.route('/css/:fileName').get(function (req, res) {res.sendFile(__dirname + '/css/' + req.params.fileName); });
app.route('/scripts/:fileName').get(function (req, res) {res.sendFile(__dirname + '/scripts/' + req.params.fileName); });
app.route('/favicons/:fileName').get(function (req, res) {res.sendFile(__dirname + '/favicons/' + req.params.fileName); });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let headerInfo = function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
};

app.use(headerInfo).route('/api/todo')
    .get((req, res) => { db.getAllNotes(req, res, io); })
    .post((req, res) => { db.postNote(req, res, io); });

app.use(headerInfo).route('/api/todo/:toDoId')
    .get((req, res) => { db.getOneNote(req, res, io); })
    .put((req, res) => { db.putNote(req, res, io); })
    .delete((req, res) => { db.deleteNote(req, res, io); });

http.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});