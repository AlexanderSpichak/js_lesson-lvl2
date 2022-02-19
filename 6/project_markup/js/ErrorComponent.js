Vue.component('error', {
    props: ['error'],
    template: `<p class="error" v-show="error">Ошибка подключения к серверу</p>`
})