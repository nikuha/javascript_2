export const Error = {
    data() {
        return {
            text: ''
        }
    },
    methods: {
        setError(error) {
            this.text = error;
        }
    },
    template: `
        <div class="error-container" v-if="text">
            <div class="row space-between">
                <div class="error-text">{{ text }}</div>
                <div><button class="standard red" @click="setError('')">&times;</button></div>            
            </div>
        </div>
    `
}