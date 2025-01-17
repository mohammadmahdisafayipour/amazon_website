import { cart } from "./cart.js";

export function navbarView() {
    let navHTML = `  <a href="#" class="img-amz">
                <img src="images/amazon-logo-white.png" alt="">
            </a>

            <form class="search-form" action="." method="get">
                <input type="search" name="q" placeholder="Search">
                <button type="submit"><i class="bi bi-search"></i></button>
            </form>


            <div class="nav-item-right">
                <a href="#" class="left">
                    <p>Returns</p>
                    <p>&Orders</p>
                </a>

                <a href="checkout.html" class="basket">
                    <div class="left-basket">
                        <span class="number">${cartQuantity()}</span>
                        <img src="images/icons/cart-icon.png" alt="">
                    </div>
                    <p>Cart</p>
                </a>
            </div>`

    document.querySelector(".navbar").innerHTML = navHTML
}


export function cartQuantity() {
    let quantity = 0
    cart.forEach(cartItem => {
        quantity += cartItem.quantity
    })
    return quantity
}

export function navCheckOutHTML() {
    let navCheckoutHTML = `
        <div class="header-content">
            <div class="checkout-header-left-section">
                <a href="index.html">
                    <img class="amazon-logo" src="images/amazon-logo.png">
                    <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
                </a>
            </div>

            <div class="checkout-header-middle-section">
                Checkout (<a class="return-to-home-link" href="amazon.html">${cart.length} items</a>)
            </div>

            <div class="checkout-header-right-section">
                <img src="images/icons/checkout-lock-icon.png">
            </div>
        </div>`
    return navCheckoutHTML
}