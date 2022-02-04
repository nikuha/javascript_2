class ProductList {

    constructor(container = '.products-container') {
        this.container = container;
        this.products = [];
        this._fetchProducts();
        this.render();
    }

    getProductsTotalCost(){
        return this.products.map(el => el.price).reduce((sum, el) => sum + el);
    }

    _fetchProducts() {
        this.products = [
            {id: 1, title: 'Notebook', price: 2000, img: 'img/products/product1.jpg'},
            {id: 2, title: 'Mouse', price: 20, img: 'img/products/product2.jpg'},
            {id: 3, title: 'Keyboard', price: 200, img: 'img/products/product3.jpg'},
            {id: 4, title: 'Gamepad', price: 50},
        ];
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.products) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
        }
    }
}

class ProductItem {

    constructor(product) {
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = product.img ? product.img : 'img/default.png';
    }

    render() {
        return `<div class="item-container" style="background-image: url('${this.img}')">
                <div class="title row space-between">
                    <div>
                        <div>${this.title}</div> 
                        <div>${this.price}&#8381;</div>
                    </div>
                    <div><button class="standard green">Купить</button></div>
                </div>
            </div>`;
    }
}

class Basket {
    container = ''; // где отображаем корзину
    items = []; // содержимое корзины, элементы BasketItem

    constructor(container){} // инициируем корзину

    addItem(item){} // добавить товар
    deleteItem(item){} // удалить товар

    getTotalCost(){} // сумма всех товаров

    render(){} // отобразить корзину
}

class BasketItem {
    product; // привязка к ProductItem
    amount; // кол-во продуктов в корзине

    constructor(product, amount = 1){} // инициируем корзину

    updateAmount(amount){} // изменить количество

    getCost(){} // стоимость товаров (product.price*amount)

    render(){} // отобразить элемент корзины
}

let list = new ProductList();
console.log(list.getProductsTotalCost());
