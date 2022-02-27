Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: [],
            imgProduct: 'https://placehold.it/200x150'
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    template: `<section class="products cards-items container">
                    <h3 class="cards-items__title">Fetured Items</h3>
                    <p class="cards-items__subtitle">Shop for items based on what we featured in this week</p>
                    <div class="cards-items__wrap">
                        <product v-for="item of filtered" 
                        :img="imgProduct"
                        :product="item"
                        @add-product="$parent.$refs.cart.addProduct"></product>
                    </div>
                    </section>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `
                <div class="cards-items__card">
                    <img class="cards-items__card-size" :src="product.img" :alt="product.product_name">
                    <div class="cards-items__card_iner">
                        <h2 class="cards-items__heading"><a href="product.html">{{ product.product_name }}</a></h2>
                        <p class="cards-items__text">lorem100 Known for her sculptural takes on traditional
                            tailoring,
                            Australian
                            arbiter
                            of
                            cool Kym Ellery teams up with Moda Operandi.</p>
                        <p class="cards-items__price">$ {{ product.price }}</p>
                    </div>
                    <a class="buy-btn hidden-button" @click="$emit('add-product', product)">
                        <img src="img/to_bascet.svg" alt="bascet">
                        <p class="hidden-button__text">Add to Cart</p>
                    </a>
                </div>
`
})