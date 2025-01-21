export function getProduct(productId) {
    let matchinProduct;
    products.forEach(product => {
        if (product.id == productId) {
            matchinProduct = product
        }
    })
    return matchinProduct
}


export let products = [];

export function loadProductXML(func) {
    const xhr = new XMLHttpRequest()
    xhr.addEventListener("load", () => {
        products = JSON.parse(xhr.response).map((product) => {
            return product
        })
        console.log('load products')
        func()
    })
    xhr.open("GET", 'https://supersimplebackend.dev/products');
    xhr.send()
}