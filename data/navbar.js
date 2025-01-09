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

                <a href="#" class="basket">
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