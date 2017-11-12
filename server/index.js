const http = require('http');
const fs = require('fs');
const url = require('url');
const hostname = '127.0.0.1';
const port = 3119;

const Datastore = require('nedb');
const db = new Datastore({filename: './data/todo.db', autoload: true});

const handler = function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Content-Type', 'application/json');

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
                    case "OPTIONS":
                        let headers = {};
                        // IE8 does not allow domains to be specified, just the *
                        // headers["Access-Control-Allow-Origin"] = req.headers.origin;
                        headers["Access-Control-Allow-Origin"] = "*";
                        headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
                        headers["Access-Control-Allow-Credentials"] = false;
                        headers["Access-Control-Max-Age"] = '86400'; // 24 hours
                        headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
                        res.writeHead(200, headers);
                        res.end();
                        break;
                    case "GET":
                        if (partials.length > 3) {
                            db.findOne({_id: partials[3]}, function (err, newDoc) {
                                res.end(JSON.stringify(newDoc));
                            });
                        } else {
                            let sorting = {dueto: 1};
                            let filter = {};
                            if (req.url.indexOf('?') >= 0) {
                                let querystring = req.url.split('?')[1];
                                let queries = [];
                                querystring.split('&').forEach(e => {
                                    let kvp = e.split('=');
                                    queries[kvp[0]] = kvp[1];
                                });
                                if (queries.hasOwnProperty('sort')) {
                                    switch (queries['sort']) {
                                        case 'dueto':
                                            sorting = {dueto: 1};
                                            break;
                                        case '-dueto':
                                            sorting = {dueto: -1};
                                            break;
                                        case 'finished':
                                            sorting = {finished: 1};
                                            break;
                                        case '-finished':
                                            sorting = {finished: -1};
                                            break;
                                        case 'created':
                                            sorting = {created: 1};
                                            break;
                                        case '-created':
                                            sorting = {created: -1};
                                            break;
                                        case 'rating':
                                            sorting = {rating: 1};
                                            break;
                                        case '-rating':
                                            sorting = {rating: -1};
                                            break;
                                    }
                                }
                                if (queries.hasOwnProperty('filter')) {
                                    filter = {$not: {finished: null}};
                                }
                            }
                            db.find(filter).sort(sorting).exec(function (err, newDoc) {
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
                            res.end(body);
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
        }
    );
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