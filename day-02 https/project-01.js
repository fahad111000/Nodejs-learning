console.log("Hello World! project 1");

const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === '/') {
        res.statusCode = 200
        res.end("Hello Home Page")
    }

    else if (req.method === "GET" && req.url === '/about') {
        res.statusCode = 200
        res.end("About Hotel")
    }

    else if (req.method === "GET" && req.url === '/contact') {
        res.statusCode = 200
        res.end("Contact Hotel")
    }

    else {
        res.statusCode = 404;
        res.end("404 page not found ");

    }


})

server.listen(3000, () => {
    console.log("server is running on port 3000")
})