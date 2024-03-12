const path = require('path');
const fs = require('fs');
const Product = require('../models/product');
const p = path.join(path.dirname(require.main.filename), 'data', 'cart.json');

const getCartFromFile = cb => {
    fs.readFile(p, (err, filecontent) => {
        if(!err){
            cb(JSON.parse(filecontent));
        }
        else{
            cb({products:[],totalPrice:0});
        }
    })
}
module.exports = class Cart{
    constructor(products, totalPrice){
        this.products = products;
        this.totalPrice = totalPrice;
    }

    static addToCart(id, price){
        getCartFromFile(cart => {
            const products = cart.products;
            const totalPrice = cart.totalPrice;
            let updatedProducts;
            const updatedPrice = totalPrice + +price;
            const index = products.findIndex(product => product.id === id);
            if(index!=-1){
                updatedProducts = [...products];
                updatedProducts[index].qty = updatedProducts[index].qty + 1;
            }
            else{
                const newProduct = {id:id,qty:1};
                updatedProducts = [...products, newProduct];
            }
            const updatedCart = {products:updatedProducts,totalPrice:updatedPrice};
            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err);
            })
        })
    }
}