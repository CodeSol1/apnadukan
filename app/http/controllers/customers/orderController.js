const Order = require('../../../models/order')

function oderController() {
    return {
        store: (req, res) => {
            // console.log(req.body)
            // validate request 

            const { phone, address } = req.body;

            if (!phone || !address) {
                req.flash('error', 'All fields are required');
                return res.redirect('/cart')

            }

            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone: phone,
                address:address
            })
            
            order.save().then(result => {
                req.flash('success', 'Order placed successfully')
                return res.redirect('/customer/orders')
            }).catch(err => {
                req.flash('error','somethings went wrong')
                return res.redirect('/cart')

            })
            
        },
        index: async(req, res) => {
            const orders = await Order.find({ customerId: req.user._id });
            res.render('customers/order', {order:orders})
            // console.log(orders)

        }
    }

}
module.exports = oderController;