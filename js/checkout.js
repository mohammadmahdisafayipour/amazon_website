import { orderSummary } from "./checkout/ordersummary.js"
import { paymentSummary } from "./checkout/paymentsummary.js"
import { navCheckOutHTML } from "../data/navbar.js"
import { loadProductXML } from "../data/products.js"
import { loadCart } from "../data/cart.js"





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




// loadProductXML(() => {
//     paymentSummary()
//     orderSummary()
//     navCheckOutHTML()
// })