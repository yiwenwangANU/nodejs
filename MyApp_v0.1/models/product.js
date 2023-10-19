const path = require('path');
const fs = require('fs');
const p = path.join(path.dirname(process.mainModule.filename), 'data', 'product.json');

const getProductFromFile = (callback) => {
    fs.readFile(p, (err, filecontent) => {
        if(!err){
            callback(JSON.parse(filecontent));
        }
        else
            callback([]);
    })
}

module.exports = class Product{
    constructor(title, price, imgUrl, detail){
        this.title = title;
        this.price = price;
        this.imgUrl = imgUrl;
        this.detail = detail;
    }

    save(){
        getProductFromFile((productList) => {
            productList.push(this);
            fs.writeFile(p, JSON.stringify(productList), err => {
                console.log(err);
            })
        })
    }

    static fetchAll(callback){
        getProductFromFile(callback);
    }

}