import { orderSummary } from "./checkout/ordersummary.js"
import { paymentSummary } from "./checkout/paymentsummary.js"
import { navCheckOutHTML } from "../data/navbar.js"
import { loadProductXML,loadProductFetch } from "../data/products.js"
import { loadCart } from "../data/cart.js"


async function loadCheckoutPage() {

    await loadProductFetch()  

    await new Promise((resolve, reject) => {
        loadCart(() => {
            resolve()
        })
    })


    paymentSummary()
    orderSummary()
    navCheckOutHTML()
}
loadCheckoutPage()



/*
Promise.all([
    new Promise((resolve, reject) => {
        loadProductXML(() => {
            resolve()
        })
    }),

    new Promise((resolve, reject) => {
        loadCart(() => {
            resolve()
        })
    })
]).then(() => {
    paymentSummary()
    orderSummary()
    navCheckOutHTML()
})
*/

/*
new Promise((resolve, reject) => {
    loadProductXML(() => {
        resolve()
    })
}).then(() => {
    return new Promise((resolve, reject) => {
        loadCart(() => {
            resolve()
        })
    })
}).then(() => {
    paymentSummary()
    orderSummary()
    navCheckOutHTML()
})*/

/*
loadProductXML(() => {
    paymentSummary()
    orderSummary()
    navCheckOutHTML()
})
*/
