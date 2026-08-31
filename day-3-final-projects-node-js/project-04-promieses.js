import { writeFile } from 'fs';
import fs from 'fs/promises';


async function getData() {

    try {
        const data = await fs.readFile('products.json', 'utf-8');
        const products = JSON.parse(data);

        const newData = {
            id: 4,
            name: "Bilal",
            category: "Python",
            salary: 750000
        };

        products.push(newData);

        // 5. JavaScript array → JSON string
        const updatedProdutsJSON = JSON.stringify(products, null, 2)

        await fs.writeFile("products.json", updatedProdutsJSON);

    }

    catch (error) {
        console.log(error);
    }

}

getData();



