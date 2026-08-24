console.log("Hello World! day 01");
const fs = require('fs')

// create file
// const createFile = fs.writeFile("My file ", "This is secret file", (err) => {
//     console.log("File created", err);
// })

// append file Existing
// fs.appendFile("My file ", "This is empty file", (err) => {

//     console.log("File appended", err);
// })


// const deltedFile = fs.unlink("My file ", (err) => {
//     console.log("File deleted", err);
// })


// fs.rename("file.txt ", "hy.txt", (err) => {
//     if (err) console.log("File read", err);
//     else console.log("File renamed");
// })

// fs.copyFile("file.txt", "./copy/mam.txt", (err) => {
//     if (err) console.log("File copied", err);
//     else console.log("File copied");
// })


// fs.rename("file.txt", "hy.txt", (err) => {
//     if (err) console.log("File read", err);
//     else console.log("File renamed");
// })

// fs.rmdir("copy", { recursive: true }, (err) => {
//     if (err) console.log("File read", err);
//     else console.log("File renamed");
// })

// HTTP
const http = require('http');

const server = http.createServer((req, res) => {
    res.end('hello! day 01 completed!!!!');
})

server.listen(3000);
