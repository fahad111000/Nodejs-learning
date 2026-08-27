console.log("Project 05");

const http = require("http");


const users = [
    { id: 1, name: "Fahad", age: 28 },
    { id: 2, name: "Faisal", age: 27 }
];

const server = http.createServer((req, res) => {

    // GET
    if (req.method === "GET" && req.url === "/users") {

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/JSON")
        res.end(JSON.stringify(users))

    }

    // POST
    if (req.method === "POST" && req.url === "/users") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk

        })

        req.on("end", () => {
            const user = JSON.parse(body);
            users.push(user)
            res.statusCode = 201
            res.end("User Created")
        })
    }
})

server.listen(3000, () => console.log("server starting!"))