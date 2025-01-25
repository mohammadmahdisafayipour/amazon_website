export let cart = JSON.parse(localStorage.getItem("cart")) || [

    {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionID: '1',

    },
    {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionID: '1',
    }

]


function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart))
}


export function addToCart(productId, value) {
    let matchingProduct;
    cart.forEach(cartItem => {
        if (cartItem.productId == productId) {
            matchingProduct = cartItem
        }
    })
    if (matchingProduct) {
        matchingProduct.quantity += value
    } else {
        cart.push({
            productId: productId,
            quantity: value,
            deliveryOptionID: '1'
        })

    }

    saveToStorage()
}



export function removeCart(productId_) {
    const newCart = []
    cart.forEach(cartItem => {
        if (cartItem.productId != productId_) {
            newCart.push(cartItem)
        }
    })

    cart = newCart

    saveToStorage()
}

export function updateCartQuantity(productId) {
    cart.forEach(cartItem => {
        if (cartItem.productId == productId) {
            cartItem.quantity = Number(document.querySelector(`.input-js-${productId}`).value)
            saveToStorage()
        }
    })
}


export function updateDeliveryOptions(productId, deliveryOptionID) {
    let matchingProduct;
    cart.forEach(cartItem => {
        if (cartItem.productId == productId) {
            matchingProduct = cartItem
        }
    })
    matchingProduct.deliveryOptionID = deliveryOptionID
    saveToStorage()
}



export function loadCart(func) {
    const xhr = new XMLHttpRequest()
    xhr.addEventListener("load", () => {
        console.log(xhr.response)
        func()
    })
    xhr.open('GET', "https://supersimplebackend.dev/cart")
    xhr.send()
}