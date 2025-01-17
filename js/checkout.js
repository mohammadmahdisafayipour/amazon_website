import { cart, removeCart, updateCartQuantity, updateDeliveryOptions } from "../data/cart.js";
import { products } from "../data/products.js";
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { deliveryOptions } from "../data/deliveryOptions.js";


function orderSummary() {
    let ordersCartHTML = ''


    cart.forEach(cartItem => {
        let matchProduct;
        products.forEach(product => {
            if (cartItem.productId === product.id) {
                matchProduct = product
            }
        })

        const deliveryOptionId = cartItem.deliveryOptionID

        let deliveryOption1;
        deliveryOptions.forEach(option => {
            if (option.id === deliveryOptionId) {
                deliveryOption1 = option
            }
        })

        const today = dayjs()
        const deliveryDate = today.add(
            deliveryOption1.deliveryDays, 'days'

        );

        const dateString = deliveryDate.format('dddd, MMMM D')

        ordersCartHTML += ` <div class="cart-item-container  cart-order-js-${matchProduct.id}">

            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                    ${matchProduct.name}
                </div>
                <div class="product-price">
                  $${(matchProduct.priceCents / 100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span class = "quantity-product">
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>

                  <span class="save-update-quantity  save-js-${matchProduct.id}">
                    <input type="number" value = "0" class = "input-js-${matchProduct.id}" >
                    <button class="save-js-btn" data-product-id = "${matchProduct.id}">Save</button>
                  </span>

                  <span class="update-quantity-link active link-primary  update-js-${matchProduct.id}" data-product-id ="${matchProduct.id}">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary" data-product-id = "${matchProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchProduct, cartItem)}
              </div>
            </div>
          </div>`



    });
    document.querySelector(".order-summary").innerHTML = ordersCartHTML


    document.querySelectorAll(".delete-quantity-link").forEach(link => {
        link.addEventListener("click", () => {
            const productId = link.dataset.productId
            let container = document.querySelector(`.cart-order-js-${productId}`)
            removeCart(productId)
            container.remove()
        })
    })

    document.querySelectorAll(".update-quantity-link")
        .forEach(update => {
            update.addEventListener("click", (e) => {
                const productId = update.dataset.productId
                let saveParent = document.querySelector(`.save-js-${productId}`)
                saveParent.classList.toggle("active")
                update.classList.toggle("active")
            })
        })


    document.querySelectorAll(".save-js-btn")
        .forEach(save => {
            save.addEventListener("click", (e) => {
                const productId = save.dataset.productId
                save.parentElement.classList.toggle("active")
                document.querySelector(`.update-js-${productId}`).classList.toggle("active")
                updateCartQuantity(productId)
                orderSummary()
            })

        })




    function deliveryOptionsHTML(matchProduct, cartItem) {

        let html = ''

        deliveryOptions.forEach((deliveryOption) => {
            const today = dayjs()
            const deliveryDate = today.add(
                deliveryOption.deliveryDays, 'days'
            );
            const dateString = deliveryDate.format('dddd, MMMM D')
            const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${(deliveryOption.priceCents / 100).toFixed(2)}-`

            const isChecked = deliveryOption.id === cartItem.deliveryOptionID
                // console.log(isChecked)
            html += `<div class="delivery-option "
                >
                  <input type="radio"
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input js-delivery-option"
                    data-product-id = "${matchProduct.id}" data-delivery-option-id ="${deliveryOption.id}"
                    name="delivery-option-${matchProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString}  Shipping
                    </div>
                  </div>
                </div>`
        })
        return html
    }


    document.querySelectorAll(".js-delivery-option").forEach(element => {
        element.addEventListener("click", () => {
            const { productId, deliveryOptionId } = element.dataset
            updateDeliveryOptions(productId, deliveryOptionId)
            orderSummary()
        })

    });

}

orderSummary()