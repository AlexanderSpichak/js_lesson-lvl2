Vue.component('filtered', {
    template: `<form action="#" class="search-form" @submit.prevent="$root.filter">
                    <input type="text" class="search-field" v-model="$root.userSearch">
                    <button type="submit" class="btn-search">
                    <i class="fas fa-search"></i>
                    </button>
            </form>`
})






