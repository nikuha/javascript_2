class BurgerMenu{
    properties = [];

    constructor(container){
        this.container = container;
        this._initProperties();
        this.render();
    }

    render(){
        const block = document.querySelector(this.container);
        for (let property of this.properties) {
            block.insertAdjacentHTML("beforeend", property.render());
        }
    }

    initBurger(burger_container){
        this.burger_container = burger_container;
        for (let pr of this.properties){
            for (let item of pr.items) {
                item.getDOM().addEventListener('click', () => {
                    if(item.checked){
                        if(pr.multi) item.uncheck();
                    } else {
                        if(!pr.multi)
                            for (let item of pr.items) {
                                item.uncheck();
                            }
                        item.check();
                    }
                    this._burgerInfo();
                })
            }
            if(!pr.multi && pr.items[0]){
                pr.items[0].check();
            }
        }
        this._burgerInfo();
    }

    _burgerInfo(){
        const block = document.querySelector(this.burger_container);
        let price = 0;
        let calories = 0;
        block.innerHTML = '';
        for (let pr of this.properties){
            for (let item of pr.items){
                if(item.checked) {
                    block.insertAdjacentHTML("beforeend", item.getInfo());
                    price += item.price;
                    calories += item.calories;
                }
            }
        }
        block.insertAdjacentHTML("beforeend",
            `<div class="burger-item">Итого: ${price}р, ${calories}ккал</div>`);
    }

    _initProperties(){
        this.properties = this._getProperties().map(item => new BurgerProperty(item));
    }

    _getProperties(){
        return [
            {
                id: 1,
                name: 'Размер',
                multi: false,
                items: [
                    {id: 1, name: 'Маленький', price: 50, calories: 20},
                    {id: 2, name: 'Большой', price: 100, calories: 40},
                ]
            },
            {
                id: 2,
                name: 'Начинка',
                multi: false,
                items: [
                    {id: 3, name: 'С сыром', price: 10, calories: 20},
                    {id: 4, name: 'С салатом', price: 20, calories: 5},
                    {id: 5, name: 'С картофелем', price: 15, calories: 10},
                ]
            },
            {
                id: 3,
                name: 'Дополнительно',
                multi: true,
                items: [
                    {id: 6, name: 'посыпать приправой', price: 15, calories: 0},
                    {id: 7, name: 'полить майонезом', price: 20, calories: 5},
                ]
            }
        ];
    }

}

class BurgerProperty{

    constructor(property) {
        this.id = property.id;
        this.name = property.name;
        this.multi = property.multi;
        this._initItems(property.items);
    }

    render(){
        return `<div class="burger-menu-row" data-id="${this.id}">
                <div class="title">${this.name}</div>
                <div class="properties">${this._renderItems()}</div>
            </div>`;
    }

    getItemsDOM(){
        return document.querySelectorAll(`div.burger-menu-row[data-id="${this.id}"] .property`);
    }

    _initItems(items){
        this.items = items.map(item => new BurgerPropertyItem(item));
    }

    _renderItems(){
        return this.items.map(item => item.render()).join('');
    }

}


class BurgerPropertyItem{

    constructor(propertyItem, checked = false) {
        this.id = propertyItem.id;
        this.name = propertyItem.name;
        this.price = propertyItem.price;
        this.calories = propertyItem.calories;
        this.checked = checked;
    }

    render(){
        return `<div class="property" data-id="${this.id}">${this.name}</div>`
    }

    getInfo(){
        return `<div class="burger-item">${this.name}: ${this.price}р, ${this.calories} ккал</div>`;
    }


    check(){
        this.checked = true;
        this.getDOM().classList.add('active');
    }

    uncheck(){
        this.checked = false;
        this.getDOM().classList.remove('active');
    }

    getDOM(){
        return document.querySelector(`div.property[data-id="${this.id}"]`);
    }

}

const menu = new BurgerMenu('.burger-menu');
menu.initBurger('.my-burger');
