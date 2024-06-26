const fs = require('fs');
const path = require('path');
const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProductsFromFile = callback => {
    fs.readFile(p, (err, filecontent) => {
        if (!err){
            callback(JSON.parse(filecontent))
        }
        else
            callback([]);
    })
}

module.exports = class Product {

    constructor(title) {
        this.title = title;
    }

    save() {
        getProductsFromFile(productList => {
            productList.push(this);
            fs.writeFile(p, JSON.stringify(productList), err => {
                console.log(err);
            })
        })
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }
}