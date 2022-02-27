Vue.component('cart', {
    data() {
        return {
            cartUrl: '/getBasket.json',
            cartItems: [],
            imgCart: 'https://placehold.it/50x100',
            showCart: false
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents) {
                    this.$data.cartItems.push(item);
                }
            });
    },
    methods: {
        addProduct(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({ quantity: 1 }, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod)
                        }
                    })
            }
        },
        sumProducts(a, b) {
            return (a * b).toFixed(2);
        },
        remove(item) {
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                })
        },
    },
    template: ` <li class="header__item cart">
                    <img src="img/bascet.svg"alt="bascet" @click="showCart = !showCart">
                    <div class="cart-block" v-show="showCart">
                        <cart-item v-for="item of cartItems" :img="imgCart" :cart-item="item" @remove="remove">
                        </cart-item>
                    </div>
                </li>
    `
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `
                <div class="cart-item">
                    <div class="product-bio">
                        <img :src="cartItem.img" alt="Some img">
                        <div class="product-desc">
                            <div class="product-title">{{ cartItem.product_name }}</div>
                            <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
                            <div class="product-single-price">$ {{ cartItem.price }}</div>
                        </div>
                    </div>
                    <div class="right-block">
                        <div class="product-price">{{$parent.sumProducts(cartItem.quantity, cartItem.price)}}$</div>
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>
    `
})

