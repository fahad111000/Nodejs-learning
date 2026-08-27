console.log("Mini Project!");

const http = require("http");
const { stringify } = require("querystring");

let users = [
    { id: 1, name: "Fahad", age: 28 },
    { id: 2, name: "Faisal", age: 27 }
];

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/users") {

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/JSON");
        res.end(JSON.stringify(users))
    }

    else if (req.method === "GET" && req.url.startsWith('/users/')) {
        const parts = req.url.split("/");
        const userID = Number(parts[2]);


        const user = users.find(user => user.id === userID)

        if (user) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/JSON");
            res.end(JSON.stringify(user))
        }

        else {
            res.statusCode = 404
            res.end("not found 404")
        }

    }
    else if (req.method === "POST" && req.url === "/users") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk
        })

        req.on("end", () => {
            const user = JSON.parse(body);
            const userID = users.length + 1;
            user.id = userID
            users.push(user);

            res.statusCode = 201
            res.end("Data Recived")

        })
    }

    else if (req.method === "DELETE" && req.url.startsWith('/users/')) {
        const parts = req.url.split("/");
        const userID = Number(parts[2]);

        const user = users.find(user => user.id === userID)

        if (user) {
            users = users.filter(user => user.id !== userID)

            res.statusCode = 200;
            res.end("User Deleted");
        }

        else {
            res.statusCode = 404;
            res.end("User Not Found");
        }



    }
})

server.listen(3000, () => console.log("Server starting..."));
