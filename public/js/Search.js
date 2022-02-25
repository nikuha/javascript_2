export const Search = {
    data() {
        return {
            searchText: ''
        }
    },
    template: `
        <form class="search-form" @submit.prevent>
            <input type="text" placeholder="поиск" v-model="searchText" />
            <button type="submit">
                <i class="fas fa-search"></i>
            </button>
        </form>
    `
}