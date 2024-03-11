const path = require('path');
const fs = require('fs');
const p = path.join(path.dirname(require.main.filename), 'data', 'cart.json');

const getFromCart = cb => {
    fs.readFile(p, (err, filecontent) => {
        if(!err){
            cb(JSON.parse(filecontent));
        }
        else{
            cb({products:[],totalPrice:0})
        }
    })
}

module.exports = class Cart{
    constructor(products, totalPrice){
        this.products = products;
        this.totalPrice = totalPrice;
    }

    static addToCart(id, price){
        getFromCart(cartconent => {
            const products = cartconent.products;
            const totalPrice = cartconent.totalPrice;
            let updatedProducts;
            const index = products.findIndex(product => product.id === id);
            if(index == -1){
                updatedProducts = [...products, {id:id,qty:1}];
            }
            else{
                updatedProducts = [...products];
                updatedProducts[index].qty = updatedProducts[index].qty + 1;
            }
            const updatedCart = {products: updatedProducts, totalPrice: totalPrice + +price};
            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err);
            })
        })
    }

    static removeFromCartById(id, price){
        getFromCart(cartconent => {
            const products = cartconent.products;
            const totalPrice = cartconent.totalPrice;
            const index = products.findIndex(product => product.id === id);
            if(index == -1){
                return;
            }
            else{
                const updatedPrice = totalPrice - price * products[index].qty;
                const updatedProducts = products.filter(product => product.id === id);
                const updatedCart = {products: updatedProducts, totalPrice: updatedPrice };
                fs.writeFile(p, JSON.stringify(updatedCart), err => {
                    console.log(err);
                })
            }
        })
    }
}