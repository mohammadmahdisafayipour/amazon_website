import { cart, removeCart,updateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";



function orderSummary(){
let ordersCartHTML = ''


cart.forEach(cartItem => {
  let matchProduct;
  products.forEach(product => {
    if (cartItem.productId === product.id) {
      matchProduct = product
    }
  })

  ordersCartHTML += ` <div class="cart-item-container  cart-order-js-${matchProduct.id}">

            <div class="delivery-date">
              Delivery date: Tuesday, June 21
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
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-1">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-1">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-1">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
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
  update.addEventListener("click",(e)=>{
    const productId = update.dataset.productId
    let saveParent = document.querySelector(`.save-js-${productId}`)
    saveParent.classList.toggle("active")
    update.classList.toggle("active")
  })
})



document.querySelectorAll(".save-js-btn")
.forEach(save => { 
  save.addEventListener("click",(e)=>{
    const productId = save.dataset.productId
    save.parentElement.classList.toggle("active")
    document.querySelector(`.update-js-${productId}`).classList.toggle("active")
    updateCartQuantity(productId)
    orderSummary()
  })
  
})
}
orderSummary()