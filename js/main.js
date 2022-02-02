const products = [
    {id: 1, title: 'Notebook', price: 2000, img: 'img/products/product1.jpg'},
    {id: 2, title: 'Mouse', price: 20, img: 'img/products/product2.jpg'},
    {id: 3, title: 'Keyboard', price: 200, img: 'img/products/product3.jpg'},
    {id: 4, title: 'Gamepad', price: 50},
];

const renderProduct = item => {
    let image = item.img ? item.img : 'img/default.png';
    return `<div class="item-container" style="background-image: url('${image}')">
                <div class="title row space-between">
                    <div>
                        <div>${item.title}</div> 
                        <div>${item.price}&#8381;</div>
                    </div>
                    <div><button class="standard green">Купить</button></div>
                </div>
            </div>`;
};

const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    //console.log(productsList);
    document.querySelector('.products-container').innerHTML = productsList.join('');
};

renderPage(products);