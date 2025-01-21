import { approximateMoney } from "./utils/util.js";


export function getProduct(productId) {
    let matchinProduct;
    products.forEach(product => {
        if (product.id == productId) {
            matchinProduct = product
        }
    })
    return matchinProduct
}


class Product {
    constructor(objectName) {
        this.id = objectName.id;
        this.image = objectName.image;
        this.name = objectName.name;
        this.rating = objectName.rating;
        this.priceCents = objectName.priceCents;
        this.keywords = objectName.keywords;
    }

    get_stars() {
        return this.rating.stars * 10
    }
    get_price() {
        return approximateMoney(this.priceCents)
    }
    extraInfoHtml() {
        return `<a href= "${this.sizeChartLink}">Size Chart</a>`
    }
}
class Clothing extends Product {
    constructor(productDetails) {
        super(productDetails)
        this.sizeChartLink = productDetails.sizeChartLink
    }
    extraInfoHTML() {
        return `<a href="${this.sizeChartLink}">Sizechart link</a>`
    }

}

export let products = [];

// export function loadProductFetch() {

// }

export function loadProductXML(func) {
    const xhr = new XMLHttpRequest()
    xhr.addEventListener("load", () => {
        products = JSON.parse(xhr.response).map(productDetails => {
            if (productDetails.type == "clothing") {
                return new Clothing(productDetails)
            }
            return new Product(productDetails)
        })
        console.log('load products')
        func()
    })
    xhr.open("GET", 'https://supersimplebackend.dev/products');
    xhr.send()
}