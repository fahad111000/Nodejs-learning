console.log("Async API USERS");

import http from "http";
import fs from "fs/promises";

const FILE = "user.json";


// GET USERS
async function getUsers() {

    const usersData = await fs.readFile(FILE, "utf-8");

    return JSON.parse(usersData);
}


// SAVE USERS
async function saveUsers(users) {

    const userData = JSON.stringify(users, null, 2);
    await new Promise(resolve => {
        setTimeout(resolve, 5000);
    });

    await fs.writeFile(FILE, userData);
}


const server = http.createServer((req, res) => {


    // GET /users

    if (req.method === "GET" && req.url === "/users") {

        getUsers()
            .then((users) => {

                res.statusCode = 200;

                res.setHeader(
                    "Content-Type",
                    "application/json"
                );

                res.end(JSON.stringify(users));

            })
            .catch((error) => {

                res.statusCode = 500;

                res.end(JSON.stringify({
                    message: "Failed to get users",
                    error: error.message
                }));

            });

        return;
    }


    // POST /users

    if (req.method === "POST" && req.url === "/users") {

        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });


        req.on("end", async () => {

            try {

                const userData = JSON.parse(body);

                const users = await getUsers();

                const newUser = {
                    id: users.length + 1,
                    ...userData
                };

                users.push(newUser);

                await saveUsers(users);

                res.statusCode = 201;

                res.setHeader(
                    "Content-Type",
                    "application/json"
                );

                res.end(JSON.stringify(newUser));

            } catch (error) {

                res.statusCode = 400;

                res.end(JSON.stringify({
                    message: "Invalid request",
                    error: error.message
                }));
            }

        });

        return;
    }


    // DELETE /users/:id

    if (req.method === "DELETE" && req.url.startsWith("/users/")) {

        (async () => {

            try {

                const id = Number(req.url.split("/")[2]);

                const users = await getUsers();

                const userExists = users.find(
                    user => user.id === id
                );

                if (!userExists) {

                    res.statusCode = 404;

                    res.end(JSON.stringify({
                        message: "User not found"
                    }));

                    return;
                }

                const updatedUsers = users.filter(
                    user => user.id !== id
                );

                console.log("before wait")
                await saveUsers(updatedUsers);
                console.log("after wait")

                res.statusCode = 200;

                res.setHeader(
                    "Content-Type",
                    "application/json"
                );

                res.end(JSON.stringify({
                    message: "User deleted successfully"
                }));

            } catch (error) {

                res.statusCode = 500;

                res.end(JSON.stringify({
                    message: "Server error",
                    error: error.message
                }));
            }

        })();

        return;
    }


    // ROUTE NOT FOUND

    res.statusCode = 404;

    res.end(JSON.stringify({
        message: "Route not found"
    }));

});


server.listen(3000, () => {

    console.log(
        "Server running on port 3000"
    );

});