<template>
    <div class='container'>
        <div class="pageTitle">
            <p>내 정보</p>
            <div class='logout'>
                <button @click='logout'>
                    로그아웃
                </button>
                 <button @click='check'>
                    check
                </button>
            </div>
        </div>
        <info-user />
            <br />
        <review-button />
            <br />
        <!-- <router-link to='/orderHistory' v-slot='{href, route, navigate}'>
            <button :href='href' @click='navigate' class='button'>
                {{ route.OrderHistory }} 주문 내역
            </button>
        </router-link> -->
    </div>
</template>

<script>
import InfoUser from '../../../components/InfoUser.vue';
import ReviewButton from '../../../components/ReviewButton.vue';
import { mapGetters, mapState } from 'vuex'
// import * as jose from 'jose'

export default {
    components: {
        InfoUser,
        ReviewButton,
    },
    name: 'MyPage',
    computed: {
        ...mapState('user',
        ['token']),
        ...mapGetters('user',[
            'isAuth'
        ]),
    },
    methods: {
        logout() {
            this.$store.dispatch('user/logout');
        },
        check() {
            console.log('isAuth', this.isAuth)
        }
    }
}
</script>

<style scoped>
a {
    text-decoration: none;
}

.container {
    display: flex;
    flex-direction: column;
    max-width: 460px;
    margin: auto;
    padding: 1rem;
    /* border: 1px solid #ddd; */
    border-radius: .25rem;
    /* box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
        0 10px 10px -5px rgba(0, 0, 0, 0.04); */
}

.button:hover {
    filter: brightness(97%);
}

.logout {
    display: flex;
    flex-direction: row-reverse;
    margin: 15px 0px;
    font-size: 1rem;
    border: 1px solid black;;
    border-radius: 0.25rem;
}

.pageTitle {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 5px 0px;
    text-align: left;
    font-size: 1.5rem;
    font-weight: bold;
}

.userinfo {
    text-align: left;
}

</style>