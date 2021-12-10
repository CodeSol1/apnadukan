import axios from "axios";
import Noty from "noty";


let addToCart = document.querySelectorAll(".add-cart")
let cartCounter = document.querySelector("#cartCounter")


// 2
// request to add my order to cart.
function updateCart(burger1) {
    axios.post('/update-cart', burger1).then((res) => {
        // console.log(res)
        cartCounter.innerText = res.data.totalQty

        new Noty({
            type:"success",
            text: "Notification text"
        }).show();
    })

     
}



// 1.
addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        // let burger = btn.dataset.burder
        // console.log(burger)
        let burger1 = JSON.parse(btn.dataset.burger);
        updateCart(burger1);
    })
})