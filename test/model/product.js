const fs = require('fs');
const path = require('path');
const p = path.join(path.dirname(require.main.filename), 'data', 'product.json');

const getProductsFromFile = callback => {
    fs.readFile(p, (err, data) => {
        if(!err){
            callback(JSON.parse(data));
        }
        else
            callback([]);
    })
}
module.exports = class Product {
    constructor(title, imgurl, price, detail) {
        this.title = title;
        this.imgurl = imgurl;
        this.price = price;
        this.detail = detail;
    }

    toString() {
        console.log(this);
    }

    save(){
        this.id = Math.random().toString();
        getProductsFromFile((products) => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err=>{
                console.log(err);
            })
        })   
    }

    static fetchAll(callback){
        return getProductsFromFile(callback)
    }
}