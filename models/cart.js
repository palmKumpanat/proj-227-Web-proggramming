 module.exports = function Cart(OldCart){
    this.items = OldCart.items ||  {};
    this.totalPrice = OldCart.totalPrice || 0;


    this.add = function(item, id){
         var storedItem = this.items[id];
         if(!storedItem){
             storedItem = this.items[id] = {item: item, qty: 0, price: 0};
         }
         storedItem.qty++;
         storedItem.price = storedItem.item.price * storedItem.qty;
         this.totalPrice += storedItem.item.price;
    }

    this.removeProductInCart = function(id){
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.price;
        this.totalPrice -= this.items[id].item.price;

        if(this.items[id].qty <= 0){
            delete this.items[id];
        }
    };

    this.generateArray = function() {
        var arr = [];
        for(var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    };

};