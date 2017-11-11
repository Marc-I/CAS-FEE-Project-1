const http = require('http');
const url = require('url');
const hostname = '127.0.0.1';
const port = 3119;

const handler = function(req, res) {
    if (req.url.indexOf("/api/todo") === 0) {

        switch (req.method) {
            case "GET":
                res.end("was a GET");
                break;
            case "POST":
                res.end("was a POST");
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