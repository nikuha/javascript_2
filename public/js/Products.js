import {ProductItem} from "./ProductItem.js";

export const Products = {
    inject: ['getJson'],
    components: {
        ProductItem
    },
    data() {
        return {
            products: []
        }
    },
    computed: {
        filteredProducts() {
            return this.products.filter(el => new RegExp(this.$root.$refs.search.searchText, 'i').test(el.product_name));
        }
    },
    mounted() {
        this.getJson(`/api/products`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
    },
    template: `
            <div v-if="!products.length" class="simple-title margin-top center">Товары не найдены</div>
            <div class="products-container">
                <ProductItem 
                v-for="el of filteredProducts" 
                :key="el.id_product"
                :product="el"
                >
                </ProductItem>
            </div>
    `
};