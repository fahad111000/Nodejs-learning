import http from "http"

// Data
let products = [
    {
        id: 1,
        name: "iPhone 15",
        category: "mobile",
        price: 250000,
        stock: 10
    },
    {
        id: 2,
        name: "Samsung Galaxy S24",
        category: "mobile",
        price: 220000,
        stock: 15
    },
    {
        id: 3,
        name: "HP EliteBook",
        category: "laptop",
        price: 180000,
        stock: 8
    },
    {
        id: 4,
        name: "Dell Inspiron",
        category: "laptop",
        price: 150000,
        stock: 12
    },
    {
        id: 5,
        name: "Sony Headphones",
        category: "accessories",
        price: 35000,
        stock: 20
    }
];

const server = http.createServer((req, res) => {

    if (req.method === "GET" && req.url.startsWith('/products')) {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const category = url.searchParams.get('category');
        const name = url.searchParams.get('name');
        const minPrice = url.searchParams.get('minPrice');
        const maxPrice = url.searchParams.get('maxPrice');

        let result = products;

        if (category) {
            result = result.filter(product => product.name === category)
        }

        if (name) {
            result = result.filter(product => product.name.toLowerCase().includes(
                name.toLowerCase()))
        }

        if (minPrice) {
            result = result.filter(product => product.price >= Number(minPrice));

        }

        if (maxPrice) {
            result = result.filter(product => product.price <= Number(maxPrice))
        }

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        res.end(JSON.stringify(result));
    }

    else if (req.method === "GET" && req.url === "/products") {

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        res.end(JSON.stringify(products));


    }

    else if (req.method === "GET" && req.url.startsWith("/products/")) {
        let parts = req.url.split("/");
        let productId = Number(parts[2]);

        let product = products.find(product => product.id === productId);

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        res.end(JSON.stringify(product));

    }

    else if (req.method === "POST" && req.url === "/products") {
        let body = "";

        req.on("data", (chunk) => {

            body += chunk;

        })

        req.on("end", () => {
            let product = JSON.parse(body);
            let newProduct = {
                id: products.length + 1,
                ...product
            }

            products.push(newProduct)
            res.statusCode = 201
            res.end("Data Recived!");

        })
    }


    else if (req.method === "PUT" && req.url.startsWith("/products/")) {
        const parts = req.url.split("/");
        const productID = Number(parts[2]);

        let productObje = products.find(product => product.id === productID);
        if (!productObje) {
            res.statusCode = 404;
            res.end("Product not found");
            return;
        }
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;

        })

        req.on("end", () => {
            let productData = JSON.parse(body);
            productObje.name = productData.name;
            productObje.stock = productData.stock;

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(productData))

        })
    }


    else if (req.method === "DELETE" && req.url.startsWith("/products/")) {
        const parts = req.url.split("/");
        const productID = Number(parts[2]);

        let productDeleted = products.filter(pro => pro.id !== productID)
        products = productDeleted;

        res.statusCode = 204;
        res.end();
    }
})

server.listen(3000, () => {
    console.log("server starting...");
})


