console.log("project-04 POST");

const http = require("http");

const server = http.createServer((req, res) => {

    if (req.method === "POST" && req.url === "/message") {

        let body = ""

        req.on("data", (chunk) => {
            body += chunk;
            JSON.parse(body);

        });

        req.on("end", () => {
            console.log("recived", body)
            res.statusCode = 200
            res.end("Data Reviced")
        })

    }


})

server.listen(3000, () => {
    console.log("Server Starting!")
})