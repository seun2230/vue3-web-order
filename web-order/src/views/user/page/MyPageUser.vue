<template>
    <div class='container'>
        <div>
            <p class='pageTitle'>내 정보</p>
            <!-- <p>{{ token ? "로그인 됨" : "로그인 안 됨" }}</p> -->
            <button class='logout' @click='logout'>
                LogOut
            </button>
            <button class='logout' @click='verfiyToken'>
                LogOuta
            </button>
        </div>
        <info-user />
            <br />
        <info-account />
            <br />
        <router-link to='/orderHistory' v-slot='{href, route, navigate}'>
            <button :href='href' @click='navigate' class='button'>
                {{ route.OrderHistory }} 주문 내역
            </button>
        </router-link>
    </div>
</template>

<script>
import InfoUser from '../../../components/InfoUser.vue';
import InfoAccount from '../../../components/InfoAccount.vue';
import { mapState } from 'vuex'
import * as jose from 'jose'

export default {
    components: {
        InfoUser,
        InfoAccount,
    },
    name: 'MyPage',
    computed: {
        ...mapState('user',
        ['token']),

    },
    methods: {
        logout() {
            this.$store.dispatch('user/logout');
        },
        verfiyToken() {
          const key = {"secret": "0012 0300 1485 023 0as0 0460 aas0 0101"}
          const recoded = jose.jwtVerify(this.token, key)
          console.log("res",this.token)
          console.log(recoded);

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

.button {
    background-color: white;
    padding: 1rem 2rem;
    margin: auto;
    border: 2px solid darkolivegreen;
    border-radius: .25rem;
    color: maroon;
    font-weight: bold;
    font-size: 1.0rem;
    display: block;
    width: 60%;
    height: 7rem;
    text-align: center;
    cursor: pointer;
}

.button:hover {
    filter: brightness(97%);
}

.pageTitle {
    margin: 5px 0px;
    text-align: left;
    font-size: 1.5rem;
    font-weight: bold;
}

.userinfo {
    text-align: left;
}

</style>