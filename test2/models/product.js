const express = require('express');
const fs = require('fs');
const path = require('path');
const p = path.join(path.dirname(require.main.filename), 'data', 'product.json');

getProductFromFile = callback => {
    fs.readFile(p, (err, data) => {
        if(err){
            callback([]);
        }
        else{
            callback(JSON.parse(data));
        }
    })
}

module.exports = class Product {
    constructor(title, img_url, price, detail){
        this.title = title;
        this.img_url = img_url;
        this.price = price;
        this.detail = detail;
    }

    save(){
        this.id = Math.random().toString();
        getProductFromFile(productList => {
            productList.push(this);
            fs.writeFile(p, JSON.stringify(productList), err => {
                console.log(err);
            })
        });

    }

    static fetchAll(cb){
        getProductFromFile(cb);
    }

    static getProductFromId(id, callback){
        getProductFromFile(products => {
            const product = products.find(p => p.id == id)
            callback(product);
        })
    }

}