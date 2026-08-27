console.log("Mini Project!");

const http = require("http");
const { stringify } = require("querystring");

const users = [
    { id: 1, name: "Fahad", age: 28 },
    { id: 2, name: "Faisal", age: 27 }
];

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/users") {


        res.statusCode = 200;
        res.setHeader("Content-Type", "application/JSON");
        res.end(JSON.stringify(users))
    }
})

server.listen(3000, () => console.log("Server starting..."));
