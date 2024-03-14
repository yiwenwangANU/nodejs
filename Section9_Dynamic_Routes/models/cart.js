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
    // Output be like: {"products":[{"id":"0.558673316244021","qty":2}],"totalPrice":41.98}
    static getCart(cb){
        getCartFromFile(cb);
    }

    // Output be like: [{"product":product,"qty":1}]
    static getCartProducts(cb){
        getCartFromFile(cart => {
            const pros = cart.products;
            let cartProduct = [];
            Product.fetchAll(products => {
                pros.forEach(p => {
                    let productId = p.id;
                    let productQty = p.qty;
                    let matchedProduct = products.find(product => product.id === productId);
                    cartProduct.push({product: matchedProduct, qty: productQty});            
                })
                cb(cartProduct);
            })
            })

    }

    static deleteProduct(id, price){
        getCartFromFile(cart => {
            const products = cart.products;
            const totalPrice = cart.totalPrice;
            let updatedProducts;
            const index = products.findIndex(product => product.id === id);
            if(index!=-1){
                const updatedPrice = totalPrice - products[index].qty * price;
                updatedProducts = products.filter(product => product.id === id);
                const updatedCart = {products:updatedProducts,totalPrice:updatedPrice};
                fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err);
                })
            }
        })
    }
}