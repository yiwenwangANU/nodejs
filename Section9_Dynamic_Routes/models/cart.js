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

    static fetchAll(cb){
        getCartFromFile(cb);
    }

    static addToCart(productId, price){
        getCartFromFile(cart => {
            const cartProducts = cart.products;
            const cartTotalPrice = cart.totalPrice;
            const index = cartProducts.findIndex(product => product.id === productId);
            let currentCartProducts;
            const currentCartTotalPrice = cartTotalPrice + +price;
            if(index!=-1){
                currentCartProducts = [...cartProducts];
                currentCartProducts[index].qty = currentCartProducts[index].qty + 1;
            }
            else{
                currentCartProducts = [...cartProducts, {id:productId,qty:1}];
            }
            const currentCart = {products:currentCartProducts,totalPrice:currentCartTotalPrice};
            fs.writeFile(p, JSON.stringify(currentCart), err => {
                console.log(err);
            })
        })
    }

    static removeFromCart(productId, price){
        getCartFromFile(cart => {
            const cartProducts = cart.products;
            const cartTotalPrice = cart.totalPrice;
            const index = cartProducts.findIndex(product => product.id === productId);
            let currentCartProducts;
            let currentCartTotalPrice;
            if(index!=-1){
                currentCartProducts = cartProducts.filter(product => product.id !== productId);
                currentCartTotalPrice = cartTotalPrice - cartProducts[index].qty * price;
                const currentCart = {products:currentCartProducts,totalPrice:currentCartTotalPrice};
                fs.writeFile(p, JSON.stringify(currentCart), err => {
                    console.log(err);
                })
            }
            else{
                return;
            }
        })
    }

    static getCartProductDetails(cb){
        // returning cartProductDetails in the form of [...{product:product,qty:4}]
        getCartFromFile(cart => {
            const cartProducts = cart.products;
            let cartProductDetails = [];
            Product.fetchAll(products => {
                cartProducts.forEach(cartProduct => {
                    const productId = cartProduct.id;
                    const qty = cartProduct.qty;
                    const product = products.find(product => product.id === productId);
                    cartProductDetails.push({product:product,qty:qty});
                })
                cb(cartProductDetails);
            })    
        });
        
    }
}