console.log("hello! proejct-02");

const http = require("http");
const { json } = require("stream/consumers");

const users = [
    { id: 1, name: 'fahad', age: 28, field: 'web dev' },
    { id: 2, name: 'faisal', age: 27, field: 'mobile app dev' },
    { id: 3, name: 'Raees', age: 23, field: 'flutter app dev' },
]

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === '/') {
        res.statusCode = 200;
        res.end("Welcome Home! ");

    }
    else if (req.method === "GET" && req.url === '/users') {
        const user = users.find(user => user.id === 2)
        res.statusCode = 200;
        res.setHeader("content-Type", "application/json");
        res.end(JSON.stringify(users));

    }

    else if (req.method === "GET" && req.url.startsWith('/users/')) {
        const parts = req.url.split("/");
        const userID = Number(parts[2]);

        const user = users.find(user => user.id === userID);

        if (user) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(user))
        }
        else {
            res.statusCode = 404
            res.end("page not found 404 error!");
        }
    }

    else {
        res.statusCode = 400
        res.end("page not found 404 Error!")
    }

})

server.listen(3000, () => {
    console.log("Working!")
})