export const BasketItem = {
    props: ['img', 'basketItem'],
    emits: ['delProduct'],
    data() {
        return {
            defaultImg: 'img/default.png'
        }
    },
    computed: {
        trueImage() {
            return (basketItem) => {
                return  basketItem.img ? basketItem.img : this.defaultImg;
            };
        }
    },
    template: `
        <div class="item-container row space-between">
            <div><img :src="trueImage(basketItem)" :alt="basketItem.product_name"></div>
            <div class="name">
                <div>{{ basketItem.product_name }}</div>
                <div>{{ basketItem.price*basketItem.quantity }}&#8381;</div>
            </div>
            <div>
                <div>Кол-во:</div>
                <div class="quantity">{{ basketItem.quantity }}</div>
            </div>
            <div>
                <div><button class="standard red delete" @click="$emit('delProduct', basketItem)">Удалить</button></div>
            </div>
        </div>
    `
};