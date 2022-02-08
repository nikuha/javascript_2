const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductList {

    constructor(container = '.products-container') {
        this.container = document.querySelector(container);
        this.products = [];
        this._fetchProducts().then(() => this._render());
    }

    _getProductsTotalCost(){ // работает только после _fetchProducts
        return this.products.reduce((sum, el) => sum += el.price, 0);
    }

    _fetchProducts() {
        return fetch(`${API_URL}/catalogData.json`)
            .then(result => result.json())
            .then(data => {
                for (let product of data) {
                    this.products.push(new ProductItem(product));
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    _render() {
        for (let product of this.products) {
            this.container.insertAdjacentHTML("beforeend", product.render());
        }
    }
}

class ProductItem {

    constructor(product) {
        ({ product_name: this.title, price: this.price, id_product: this.id } = product);
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
