// import http from 'http';
// import fs from 'fs/promises';

// const server = http.createServer((req, res) => {
//     if (req.method === "POST" && req.url === "/products") {

//         let body = "";

//         req.on("data", (chunk) => {
//             body += chunk
//         })

//         req.on("end", async () => {

//             try {
//                 const productData = JSON.parse(body);
//                 const data = await fs.readFile('products.json', 'utf-8');

//                 const products = JSON.parse(data);

//                 const newproductData = {
//                     id: products.length + 1,
//                     ...productData
//                 }

//                 products.push(newproductData);

//                 const updatedData = JSON.stringify(products, null, 2);

//                 await fs.writeFile("products.json", updatedData);
//                 // Response
//                 res.statusCode = 201;
//                 res.setHeader(
//                     "Content-Type",
//                     "application/json"
//                 );

//                 res.end(JSON.stringify(newproductData));
//             }

//             catch (error) {
//                 res.statusCode = 500;
//                 res.setHeader(
//                     "Content-Type",
//                     "application/json"
//                 );

//                 res.end(
//                     JSON.stringify({
//                         message: "Something went wrong",
//                         error: error.message

//                     }))
//             }
//         })

//     }
// })

// server.listen(3000, () => {
//     console.log("server starting..")
// })


// ______________________________________________

function getProduct() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("product data")
        }, 2000);
    })
}

function getUser() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("user data")
        }, 2000);
    })
}

function getOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("order data")
        }, 2000);
    })
}


async function main() {
    const [product, user, order] = await Promise.all([
        getProduct(),
        getUser(),
        getOrder()
    ])

    console.log(product);
    console.log(user);
    console.log(order);
}

main();