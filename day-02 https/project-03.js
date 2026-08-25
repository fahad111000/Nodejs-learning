console.log("project-03 hotel API");

const http = require('http');

// Rooms data
const rooms = [
    { id: 101, type: "Single", price: 3000, status: "available" },
    { id: 102, type: "Double", price: 5000, status: "booked" },
    { id: 103, type: "Single", price: 3000, status: "available" },
    { id: 1032, type: "Single", price: 3000, status: "available" },
    { id: 1013, type: "Single", price: 3000, status: "available" },
    { id: 1034, type: "Single", price: 3000, status: "available" },
    { id: 104, type: "Suite", price: 8000, status: "booked" }
];

const server = http.createServer((req, res) => {

    if (req.method === "GET" && req.url === "/") {
        res.end("welcome Hotel ");
    }
    else if (req.method === "GET" && req.url === "/rooms") {
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(rooms))
    }

    // speific room

    else if (req.method === "GET" && req.url.startsWith('/rooms/')) {

        const parts = req.url.split("/");
        const roomId = Number(parts[2])

        const room = rooms.find(room => room.id === roomId);

        if (room) {
            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify(room))
        }

        else {
            res.statusCode = 404
            res.end("room not found")
        }
    }

    else if (req.method === "GET" && req.url.startsWith("/rooms?")) {
        const parts = req.url.split("?");
        const qurey = parts[1].split("=");

        const filterRooms = rooms.filter(room => room.status === qurey[1])
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(filterRooms))
    }

    else {
        res.statusCode = 404
        res.end("404 page not found ");
    }

})

server.listen(3000, () => {
    console.log("3000 working...")
})