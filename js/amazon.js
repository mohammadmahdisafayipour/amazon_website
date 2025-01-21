import { products, loadProductXML } from "../data/products.js";
import { cart, addToCart } from "../data/cart.js";
import { navbarView } from "../data/navbar.js";

export function renderAmazonPage() {

    const productsParent = document.querySelector(".cards-section")
    let productHtml = ''

    products.forEach((product) => {
        productHtml += `
    <div class="card-item">
                <div class="top">
                <div class="image-card">
                <img src="${product.image}" alt="product">
                </div>
                <div class="content">
                <p>${product.name}</p>
                <div class="start-score">
                <img src="images/ratings/rating-${product.get_stars()}.png" alt="">
                <a href="#" class="score-start">127</a>
                </div>
                <p class="price">$${product.get_price()}</p>
                
                <div class="select-input-parent">
                <select name="number" id="number" class="numbers js-selector-${product.id}">
                <option value="1" selected>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>

                ${product.extraInfoHtml()}

                </div>
                </div>
                </div>
                <button class="add-to-cart-btn" data-product-id = "${product.id}">Add to Card</button>
                </div>`
    })

    productsParent.innerHTML = productHtml





    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener("click", () => {
            const productId = btn.dataset.productId
            let value = Number(document.querySelector(`.js-selector-${productId}`).value)

            addToCart(productId, value)

            navbarView()
        })
    });


    navbarView()

}
loadProductXML(renderAmazonPage)