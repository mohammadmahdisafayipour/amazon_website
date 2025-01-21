import { orderSummary } from "./checkout/ordersummary.js"
import { paymentSummary } from "./checkout/paymentsummary.js"
import { navCheckOutHTML } from "../data/navbar.js"
import { loadProductXML } from "../data/products.js"


loadProductXML(() => {
    paymentSummary()
    orderSummary()
    navCheckOutHTML()
})