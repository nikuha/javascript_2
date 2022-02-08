const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductList {

    constructor(basket, container = '.products-container') {
        this.container = document.querySelector(container);
        this.products = [];
        this.basket = basket;
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
        this._initButtons();
    }

    _initButtons(){
        this.container.querySelectorAll(ProductItem.getBuySelector()).forEach(button => {
            button.addEventListener('click',  () => {
                const item_id = Number(button.getAttribute('data-id'));
                this.basket.addItem(this.products.find(item => item.id === item_id));
            })
        });
    }

}

class ProductItem {

    constructor(product) {
        ({ product_name: this.title, price: this.price, id_product: this.id } = product);
        this.img = product.img ? product.img : 'img/default.png';
    }

    static getBuySelector(){
        return '.item-container button.buy';
    }

    getSelector(){
        return `.item-container[data-id="${this.id}"]`;
    }

    render() {
        return `<div class="item-container" style="background-image: url('${this.img}')" data-id="${this.id}">
                <div class="title row space-between">
                    <div>
                        <div>${this.title}</div> 
                        <div>${this.price}&#8381;</div>
                    </div>
                    <div><button class="standard green buy" data-id="${this.id}">Купить</button></div>
                </div>
            </div>`;
    }
}

class Basket {
    items = [];

    constructor(container = '.basket-menu', link_selector = '.basket-a'){
        this.container = document.querySelector(container);
        this._initLink(link_selector);
        this._fetchItems().then(() => this._render());
    }

    addItem(product){
        const item = this.items.find(item => item.id === product.id);
        if(item){
            item.quantity += 1;
            this.container.querySelector(item.getQuantitySelector()).textContent = item.quantity;
        } else {
            const item = new BasketItem(product);
            this.items.push(item);
            this.container.insertAdjacentHTML("beforeend", item.render());
            this._initButtons(item);
        }
        this.container.classList.add('active');
    }

    _initLink(link_selector){
        document.querySelector(link_selector).addEventListener('click', () => {
            this.container.classList.toggle('active');
        });
    }

    _fetchItems(){
        return fetch(`${API_URL}/getBasket.json`)
            .then(result => result.json())
            .then(data => {
                for (let item of data.contents) {
                    this.items.push(new BasketItem(item));
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    _render(){
        for (let item of this.items) {
            this.container.insertAdjacentHTML("beforeend", item.render());
        }
        this._initButtons();
    }

    _initButtons(item){
        let selector = item ? item.getDeleteSelector() : BasketItem.getDeleteSelectors();
        this.container.querySelectorAll(selector).forEach(button => {
            button.addEventListener('click',  () => {
                const item_id = Number(button.getAttribute('data-id'));
                const new_items = [];
                this.items.forEach((item, k) => {
                    if(item.id === item_id){
                        this.container.querySelector(item.getSelector()).remove();
                    } else{
                        new_items.push(item);
                    }
                })
                this.items = new_items;
                if(!this.items.length){
                    this.container.classList.remove('active');
                }
            })
        });
    }

}

class BasketItem {

    constructor(item){
        if(item.product_name){
            // из api
            ({ product_name: this.title, price: this.price, id_product: this.id } = item);
        } else {
            // из ProductItem
            ({ title: this.title, price: this.price, id: this.id } = item);
        }
        this.img = item.img ? item.img : 'img/default.png';
        this.quantity = item.quantity ? item.quantity : 1;
    }

    static getDeleteSelectors(){
        return '.item-container button.delete';
    }

    getDeleteSelector(){
        return `.item-container[data-id="${this.id}"] button.delete`;
    }

    getSelector(){
        return `.item-container[data-id="${this.id}"]`;
    }

    getQuantitySelector(){
        return `.item-container[data-id="${this.id}"] .quantity`;
    }

    render() {
        return `
            <div class="item-container row space-between" data-id="${this.id}">
                <div><img src="${this.img}" alt=""></div>
                <div class="name">
                    <div>${this.title}</div> 
                    <div>${this.price}&#8381;</div>   
                </div>
                <div>
                    <div>Кол-во:</div> 
                    <div class="quantity">${this.quantity}</div> 
                </div>
                <div>
                    <div><button class="standard red delete" data-id="${this.id}">Удалить</button></div> 
                </div>
            </div>`;
    }
}

const basket = new Basket();
const list = new ProductList(basket);
