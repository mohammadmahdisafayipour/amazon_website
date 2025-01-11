export let cart = JSON.parse(localStorage.getItem("cart")) ||
[
    
    {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1
        
    },
    {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1
    }
    
]


function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart))
}


export function addToCart(productId,value){
    let matchingProduct;
    cart.forEach(cartItem => {
        if (cartItem.productId == productId) {
            matchingProduct = cartItem
        }
    })
    if (matchingProduct) {
        matchingProduct.quantity += value
    }
    else {
        cart.push(
            {
                productId: productId,
                quantity: value
            }
        )

    }

    saveToStorage()
}



export function removeCart(productId_){
    const newCart = []
    cart.forEach(cartItem =>{
        if (cartItem.productId != productId_){
            newCart.push(cartItem)
        }
    })

    cart = newCart

    saveToStorage()
}