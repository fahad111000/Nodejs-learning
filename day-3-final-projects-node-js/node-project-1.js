console.log("Task Management API");

import http from 'http'
let tasks = [
    { id: 1, title: "complete React ", completed: true },
    { id: 2, title: "Learn node js ", completed: true },
    { id: 3, title: "Built API ", completed: false }
]

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/tasks") {
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json");

        res.end(JSON.stringify(tasks));
    }

    else if (req.method === "GET" && req.url.startsWith('/tasks/')) {
        const parts = req.url.split("/");
        const taskID = Number(parts[2]);


        const user = tasks.find(task => task.id === taskID)
        console.log(user)

        if (user) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");

            res.end(JSON.stringify(user));
        }
        else {
            res.statusCode = 404
            res.end()
        }
    }

    else if (req.method === "POST" && req.url === "/tasks") {

        let body = "";

        req.on("data", (chunk) => {

            body += chunk;

        })

        req.on("end", () => {
            let task = JSON.parse(body);
            let newTask = {
                id: tasks.length + 1,
                ...task
            }
            tasks.push(newTask)

            res.statusCode = 201

            res.end("Data recived!")

        })

    }
    else if (req.method === "PUT" && req.url.startsWith('/tasks/')) {

        let parts = req.url.split('/');
        let taskID = Number(parts[2]);

        let userTask = tasks.find(task => task.id === taskID);

        if (!userTask) {
            res.statusCode = 404
            res.end("task not found")
            return
        }

        let body = ""

        req.on("data", (chunk) => {
            body += chunk
        })

        req.on("end", () => {
            const updateData = JSON.parse(body);
            userTask.title = updateData.title;
            userTask.completed = updateData.completed;

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");

            res.end(JSON.stringify(userTask))
        })





    }
    else if (req.method === "DELETE" && req.url.startsWith('/tasks/')) {
        let parts = req.url.split('/');
        let taskID = Number(parts[2]);

        let filterTask = tasks.filter((task) => task.id !== taskID);
        tasks = filterTask;

        res.statusCode = 204;
        console.log("Data Deleted!")
        res.end()

    }

})

server.listen(3000, () => {
    console.log("server is starting..")
})
