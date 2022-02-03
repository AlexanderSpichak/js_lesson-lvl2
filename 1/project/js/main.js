const products = [
    { id: 1, title: 'Notebook', price: 2000, img: '118134_p_20.png' },
    { id: 2, title: 'Mouse', price: 20, img: '118134_p_20.png' },
    { id: 3, title: 'Keyboard', price: 200, img: '118134_p_20.png' },
    { id: 4, title: 'Gamepad', price: 50, img: '118134_p_20.png' },
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (title, price, img) => {
    return `<div class="product-item">
                <h3>${title}</h3>
                <img src="img/${img}" alt="value">
                <div>
                    <p>${price}$</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item.title, item.price, item.img));

    // console.log(productsList);

    function cocncatination(arr) {
        arr.forEach(element => {
            document.querySelector('.products').innerHTML += element;
        });
    }
    cocncatination(productsList);
}

renderPage(products);