import { cart, removeCart, updateCartQuantity, updateDeliveryOptions } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { approximateMoney } from "../../data/utils/util.js";


export function paymentSummary() {

    let productPriceCents = 0
    let shippingPriceCents = 0


    cart.forEach(cartItem => {

        let matchingProduct = getProduct(cartItem.productId)

        productPriceCents += matchingProduct.priceCents * cartItem.quantity;

        let deliveryOptionMatch = getDeliveryOption(cartItem.deliveryOptionID)


        shippingPriceCents += deliveryOptionMatch.priceCents
    });

    const totalBeforeTax = productPriceCents + shippingPriceCents
    const tax = totalBeforeTax * 0.1
    const orderTotal = tax + totalBeforeTax


    let paymentSummaryHTML = `
  <div class="payment-summary-title">
                    Order Summary
                </div>

                <div class="payment-summary-row">
                    <div>Items (${cart.length}):</div>
                    <div class="payment-summary-money">$${approximateMoney(productPriceCents)}</div>
                </div>

                <div class="payment-summary-row">
                    <div>Shipping &amp; handling:</div>
                    <div class="payment-summary-money">$${approximateMoney(shippingPriceCents)}</div>
                </div>

                <div class="payment-summary-row subtotal-row">
                    <div>Total before tax:</div>
                    <div class="payment-summary-money">$${approximateMoney(totalBeforeTax)}</div>
                </div>

                <div class="payment-summary-row">
                    <div>Estimated tax (10%):</div>
                    <div class="payment-summary-money">$${approximateMoney(tax)}</div>
                </div>

                <div class="payment-summary-row total-row">
                    <div>Order total:</div>
                    <div class="payment-summary-money">$${approximateMoney(orderTotal)}</div>
                </div>

                <button class="place-order-button button-primary">
            Place your order
          </button>`
    document.querySelector('.payment-summary').innerHTML = paymentSummaryHTML
}