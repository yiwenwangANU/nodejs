const path = require('path');
const fs = require('fs');
const p = path.join(path.dirname(require.main.filename), 'data', 'cart.json');

const getCartContent = cb => {
    fs.readFile(p, (err, filecontent) => {
        if(!err){
            cb(JSON.parse(filecontent));
        }
        else
            cb({products:[],totalPrice:0});
    })
}
module.exports = class Cart{
    constructor(products, totalPrice){
        this.products = products;
        this.totalPrice = totalPrice;
    }

    static addToCart(productId, price){
        getCartContent(cartcontent => {
            const products = cartcontent.products;
            const totalPrice = cartcontent.totalPrice;
            let currentProducts;
            const index = products.findIndex(product => product.id === productId);
            if(index!=-1){
                currentProducts = [...products];
                currentProducts[index].qty = currentProducts[index].qty + 1;
            }
            else{
                currentProducts = [...products, {id:productId,qty:1}];
            }
            const newCart = new Cart(currentProducts, totalPrice + +price);
            fs.writeFile(p, JSON.stringify(newCart), err => {
                //console.log(err);
            })
        })
    }
}