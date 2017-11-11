const http = require('http');
const fs = require('fs');
const url = require('url');
const hostname = '127.0.0.1';
const port = 3119;

const Datastore = require('nedb');
const db = new Datastore({filename: './data/todo.db', autoload: true});

const handler = function (req, res) {
    let body = [];
    req.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();

        if (req.url.indexOf("/api/todo") === 0) {

            let partials = req.url.split('/');

            switch (req.method) {
                case "GET":
                    if (partials.length > 3) {
                        db.findOne({_id: partials[3]}, function (err, newDoc) {
                            res.end(JSON.stringify(newDoc));
                        });
                    } else {
                        db.find({}, function (err, newDoc) {
                            res.end(JSON.stringify(newDoc));
                        });
                    }
                    break;
                case "POST":
                    db.insert(JSON.parse(body), function (err, newDoc) {
                        res.end(JSON.stringify(newDoc));
                    });
                    break;
                case "PUT": {
                    let newItem = JSON.parse(body);
                    db.update({_id: newItem._id}, newItem, {}, function (err, numReplaced) {
                        res.end(numReplaced + " was a PUT");
                    });
                }
                    break;
                case "DELETE":
                    if (partials.length > 3) {
                        db.remove({_id: partials[3]}, {}, function (err, numRemoved) {
                            res.end(numRemoved + " was a DELETE");
                        });
                    }
                    break;
            }
        }
        // At this point, we have the headers, method, url and body, and can now
        // do whatever we need to in order to respond to this request.
    });
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