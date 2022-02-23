import {BasketItem} from "./BasketItem.js";

export const Basket = {
    inject: ['API', 'getJson'],
    components: {
        BasketItem
    },
    data() {
        return {
            showBasket: false,
            basketUrl: '/getBasket.json',
            basketItems: [],
        }
    },
    methods: {
        addProduct(product) {
            this.getJson(`${this.API}/addToBasket.json`)
                .then(data => {
                    if(data.result){
                        let find = this.basketItems.find(el => el.id_product === product.id_product);
                        if(find){
                            find.quantity++
                        } else {
                            let prod = Object.assign({quantity: 1}, product);
                            this.basketItems.push(prod);
                        }
                        this.showBasket = true;
                    }
                })
        },
        delProduct(product){
            this.getJson(`${this.API}/deleteFromBasket.json`)
                .then(data => {
                    if(data.result){
                        if(product.quantity > 1){
                            product.quantity--
                        } else {
                            this.basketItems.splice(this.basketItems.indexOf(product), 1)
                        }
                    }
                })
        },
    },
    mounted() {
        this.getJson(`${this.API + this.basketUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.basketItems.push(el);
                }
            });
    },
    template: `
        <div class="links row flex-wrap">
            <div class="menu-link"><a href="#" class="basket-a" @click="showBasket = !showBasket">Корзина</a></div>
        </div>
        <div class="basket-menu" v-show="showBasket">
            <div v-if="!basketItems.length">Корзина пуста</div>
             <BasketItem 
                v-for="item of basketItems" 
                :key="item.id_product"
                :basketItem="item"
                @delProduct="delProduct"
            ></BasketItem>            
        </div>
    `
};