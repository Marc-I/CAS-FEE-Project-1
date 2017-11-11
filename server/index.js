const http = require('http');
const fs = require('fs');
const url = require('url');
const hostname = '127.0.0.1';
const port = 3119;

const Datastore = require('nedb');
const db = new Datastore({ filename: './data/todo.db', autoload: true });

const handler = function (req, res) {
    if (req.url.indexOf("/api/todo") === 0) {

        switch (req.method) {
            case "GET":
                db.find({}, function (err, newDoc) {
                    res.end(JSON.stringify(newDoc));
                });
                break;
            case "POST":
                db.insert({ Name: "Iten", Prename: "Marc"}, function(err, newDoc){
                    res.end(JSON.stringify(newDoc));
                });
                break;
            case "PUT":
                res.end("was a PUT");
                break;
            case "PATCH":
                res.end("was a PATCH");
                break;
            case "DELETE":
                res.end("was a DELETE");
                break;
        }
    }
};

const server = http.createServer();
server.on("request", handler);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

function SaveData(JsonData, callback) {
    fs.writeFile('myjsonfile.json', JSON.stringify(JsonData), 'utf8', callback);
}

function LoadData(callback) {
    fs.exists('myjsonfile.json', function (exists) {
        if (exists) {
            fs.readFile('myjsonfile.json', 'utf8', callback);
        } else {
            SaveData([]);
        }
    });
}