


const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = data;
                //                 console.log(data);
                this.render()
            });
    }
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }
    _getProducts() {

        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });

    }
    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            //            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}
// Скорее всего очень кривое решение, но оно работает =)
/* Если можно оставьте пару коментов, где совсем неприемлимо написано и где что можно было упростить/заменить на
какую либо конструкцию. */
class Cart {
    constructor(container = '.cart') {
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._getProducts()
            .then(data => {
                this.goods = data.contents;
                this.render();
                this._deleteItems();
                this._addItems();
            });
    }
    _getProducts() {

        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });

    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new CartItem(product);
            //            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
    _deleteItems() {
        let cart = document.querySelectorAll('.cart-item');
        cart.forEach(element => {
            element.querySelector('button').addEventListener('click', function () {
                element.remove();
                if (document.querySelector('.cart').innerHTML == '') {
                    document.querySelector('.cart').insertAdjacentHTML("beforeend", '<p class="empty-cart">Тут пока пусто...</p>')
                }
            })
        });
    }
    _addItems() {
        // let buttons = document.querySelectorAll('.buy-btn');
        let cards = document.querySelectorAll('.product-item');
        let cart = document.querySelector('.cart');
        cards.forEach(element => {
            element.querySelector('.buy-btn').addEventListener('click', () => {
                let count = 0;
                cart.childNodes.forEach(cartItem => {
                    if (element.getAttribute('data-id') == cartItem.getAttribute('data-id')) {
                        cartItem.querySelector('span').innerHTML++;
                    } else {
                        count++;
                    }
                });
                this._deleteItems();
                if (!(document.querySelector('.empty-cart') == null)) {
                    document.querySelector('.empty-cart').remove();
                }
                if (count == cart.childNodes.length || cart.childNodes.length == 0) {
                    cart.insertAdjacentHTML('beforeend', `<div class="cart-item" data-id="${element.getAttribute('data-id')}">
                                                    <img src="${element.querySelector('img').currentSrc}" alt="Some img">
                                                    <h3>${element.querySelector('h3').innerHTML}</h3>
                                                    <p>${element.querySelector('p').innerHTML}</p>
                                                    <div class="item-count"><span>1</span> шт.</div>
                                                    <button><img src="img/1485477104-basket_78591.svg" alt="delete"></button>
                                                </div>`)
                }
            })
        });
    }
}

class CartItem extends ProductItem {
    constructor(product, img) {
        super(product, img);
    }
    render() {
        return `<div class="cart-item" data-id="${this.id}">
                    <img src="${this.img}" alt="Some img">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <div class="item-count"><span>1</span> шт.</div>
                    <button><img src="img/1485477104-basket_78591.svg" alt="delete"></button>
                </div>`

    }
}

let list = new ProductsList();
let cart = new Cart();
console.log(list.allProducts);