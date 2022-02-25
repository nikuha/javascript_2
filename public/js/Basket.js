import {BasketItem} from "./BasketItem.js";

export const Basket = {
    inject: ['getJson', 'postJson', 'putJson'],
    components: {
        BasketItem
    },
    data() {
        return {
            showBasket: false,
            basketItems: [],
        }
    },
    methods: {
        addProduct(product) {
            let find = this.basketItems.find(el => el.id_product === product.id_product);
            if (find) {
                this.putJson(`/api/basket/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result) {
                            find.quantity++
                        }
                    });
                this.showBasket = true;
                return;
            }

            const prod = Object.assign({quantity: 1}, product);

            this.postJson(`/api/basket`, prod)
                .then(data => {
                    if (data.result) {
                        this.basketItems.push(prod);
                    }
                });
        },
        delProduct(product){
            let find = this.basketItems.find(el => el.id_product === product.id_product);
            if (find) {
                this.putJson(`/api/basket/${find.id_product}`, { quantity: - 1 })
                    .then(data => {
                        if(product.quantity > 1){
                            product.quantity--
                        } else {
                            this.basketItems.splice(this.basketItems.indexOf(product), 1)
                        }
                    });
            }
        },
    },
    mounted() {
        this.getJson(`/api/basket`)
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