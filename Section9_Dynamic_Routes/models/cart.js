const path = require('path');
const fs = require('fs');
const p = path.join(path.dirname(require.main.filename), 'data', 'cart.json');

const getCartContent = cb => {
    fs.readFile(p, (err, filecontent) => {
        if (!err) {
            cb(JSON.parse(filecontent));
        }
        else
            cb({ products: [], totalPrice: 0 });
    })
}
module.exports = class Cart {
    constructor(products, totalPrice) {
        this.products = products;
        this.totalPrice = totalPrice;
    }
    static addToCart(id, price) {
        let cart;
        getCartContent(cartContent => {
            console.log(cartContent);
            const index = cartContent.products.findIndex(prod => prod.id === id);
            let updatedProducts;
            if (index != -1) {
                updatedProducts = [...cartContent.products];
                updatedProducts[index].qty = updatedProducts[index].qty + 1;
            }
            else {
                updatedProducts = [...cartContent.products, { id: id, qty: 1 }];
            }
            cart = new Cart(updatedProducts, cartContent.totalPrice + +price);



            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            })
        })
    }
}