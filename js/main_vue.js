import {Basket} from "./Basket.js";
import {Products} from "./Products.js";
import {Error} from "./Error.js";
import {Search} from "./Search.js";

const App = {
    components: {
        Basket,
        Products,
        Search,
        Error
    },
    data() {
        return {
            API: `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`,
            userSearch: ''
        }
    },
    provide() {
        return {
            API: this.API,
            getJson: this.getJson
        }
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => this.$refs.error.setError(error))
        }
    },
};

Vue.createApp(App).mount('#app');

