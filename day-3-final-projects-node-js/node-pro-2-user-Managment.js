console.log("prject-2")
import http from "http"


let users = [
    {
        id: 1,
        name: "Ali Khan",
        email: "ali@example.com",
        age: 25
    },
    {
        id: 2,
        name: "Fahad Khan",
        email: "fahad@example.com",
        age: 22
    },
    {
        id: 3,
        name: "Ahmed Shah",
        email: "ahmed@example.com",
        age: 28
    },
    {
        id: 4,
        name: "Usman Ali",
        email: "usman@example.com",
        age: 24
    }
];

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/users") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        res.end(JSON.stringify(users))
    }

    else if (req.method === "GET" && req.url.startsWith('/users/')) {
        const parts = req.url.split('/');
        const userID = Number(parts[2]);

        const user = users.find(user => user.id === userID);

        if (user) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");

            res.end(JSON.stringify(user))
        }


    }

    else if (req.method === "POST" && req.url === '/users') {

        let body = "";
        req.on("data", (chunk) => {
            body += chunk;

        })

        req.on('end', () => {
            const userData = JSON.parse(body);
            const newData = {
                id: users.length + 1,
                ...userData
            }
            users.push(newData);

            res.statusCode = 200
            res.end("Data Recived!")
        })
    }

    else if (req.method === "PUT" && req.url.startsWith('/users/')) {

        const parts = req.url.split('/');
        const userID = Number(parts[2]);

        let userData = users.find(user => user.id === userID);
        let body = ""

        req.on("data", (chunk) => {
            body += chunk
        })

        req.on("end", () => {
            let updatedUser = JSON.parse(body);
            userData.name = updatedUser.title
            res.statusCode = 201

            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(updatedUser))
        })

    }


    else if (req.method === "DELETE" && req.url.startsWith('/users/')) {
        let parts = req.url.split('/');
        let userID = Number(parts[2]);

        let filterUsers = users.filter((user) => user.id !== userID);
        users = filterUsers;

        res.statusCode = 204;
        console.log("Data Deleted!")
        res.end()

    }


})



server.listen(3000, () => {
    console.log("servser starting...")
})

