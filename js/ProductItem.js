export const ProductItem = {
    props: ['product'],
    data() {
        return {
            defaultImg: 'img/default.png'
        }
    },
    computed: {
        bgStyle() {
            return (product) => {
                const image = product.img ? product.img : this.defaultImg;
                return {backgroundImage: `url('${image}')`}
            };
        }
    },
    template: `
        <div class="item-container" :style="bgStyle(product)">
            <div class="title row space-between">
                <div>
                    <div>{{ product.product_name }}</div>
                    <div>{{ product.price }}&#8381;</div>
                </div>
                <div><button class="standard green buy" @click="$root.$refs.basket.addProduct(product)">Купить</button></div>
            </div>
        </div>`
};