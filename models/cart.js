const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
    totalprice : Number,
    Shipping : Number,
    totalQty : Number,
    totalPayment : Number,
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        address: String,
        postalCode: String,
        city : String
    },
    items: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Items'
    }]
});


module.exports = mongoose.model('Cart', cartSchema);

// module.exports = function Cart(Cart){
//     this.items = Cart.items ||  {};
//     this.totalPrice = Cart.totalPrice || 0;



//     this.add = function(item, id){
//          var storedItem = this.items[id];
//          if(!storedItem){
//              storedItem = this.items[id] = {item: item, qty: 0, price: 0};
//          }
//          storedItem.qty++;
//          storedItem.price = storedItem.item.price * storedItem.qty;
//          this.totalPrice += storedItem.item.price;
//     }

//     this.removeProductInCart = function(id){
//         this.items[id].qty--;
//         this.items[id].price -= this.items[id].item.price;
//         this.totalPrice -= this.items[id].item.price;

//         if(this.items[id].qty <= 0){
//             delete this.items[id];
//         }
//     };

//     this.generateArray = function(){
//         var arr = [];
//         for(var id in this.items){
//             arr.push(this.items[id]);
//         }
//         return arr;
//     };

// };













