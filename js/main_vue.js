const App = {
    data(){
        return {
            API: `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`,
            catalogUrl: '/catalogData.json',
            basketUrl: '/getBasket.json',
            products: [],
            basketItems: [],
            imgCatalog: 'img/default.png',
            showBasket: false,
            search: ''
        }
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(e => console.log(e));
        },
        addProduct(product) {
            this.getJson(`${this.API}/addToBasket.json`)
                .then(data => {
                    if(data.result){
                        const item = this.basketItems.find(el => el.id_product === product.id_product);
                        if(item){
                            item.quantity++;
                        } else {
                            this.basketItems.push(Object.assign(product, {quantity: 1}));
                        }
                        this.showBasket = true;
                    }
                });
        },
        delProduct(item) {
            this.getJson(`${this.API}/deleteFromBasket.json`)
                .then(data => {
                    if(data.result){
                        this.basketItems.splice(this.basketItems.indexOf(item), 1);
                    }
                });
        }
    },
    computed: {
        bgStyle() {
            return {backgroundImage: `url('${this.imgCatalog}')`}
        },
        filtered_products() {
            const regexp = new RegExp(this.search, 'i');
            return this.products.filter(product => regexp.test(product.product_name));
        }
    },
    mounted() {
        this.getJson(`getProducts.json`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
        this.getJson(`${this.API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
        this.getJson(`${this.API + this.basketUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.basketItems.push(el);
                }
            });
    }

};

Vue.createApp(App).mount('#app');