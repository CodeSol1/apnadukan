function cartController() {
    return {
        index: (req, res) => {
            
            res.render('customers/cart')
        },
        update: (req, res) => {

            // console.log(req.body)
            // cart structure
            // let cart = {
            //     items:{
            //         burgerid:{ item: burgerObject, qty: 0 } 
                //  },
            //     totalQty: 0,
            //     totalPrice:0,
            // }


    //    add to cart logic
            // if cart is not present in session means order 1st time
            if (!req.session.cart) {
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0,
                }
            }
            let cart = req.session.cart
                // check if item does not exists in cart
            if (!cart.items[req.body._id]) {
                cart.items[req.body._id] = {
                    item: req.body,
                    qty:1
                }
                cart.totalQty = cart.totalQty+ 1;
                cart.totalPrice = cart.totalPrice + req.body.price;
                      
            } else {
                cart.items[req.body._id].qty += 1;
                cart.totalQty += 1;
                cart.totalPrice += req.body.price;
            }
            
            return res.json({totalQty:cart.totalQty})
        }
    }
}

module.exports = cartController