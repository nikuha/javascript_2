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
            getJson: this.getJson,
            putJson: this.putJson,
            postJson: this.postJson
        }
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => this.$refs.error.setError(error))
        },
        postJson(url, data){
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setError(error))
        },
        putJson(url, data){
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setError(error))
        }
    },
};

Vue.createApp(App).mount('#app');

