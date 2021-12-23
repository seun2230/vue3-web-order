<template>
    <div class='container'>
        <div class="pageTitle">
            <div class="login__user">
                {{ getUserName }}님 안녕하세요,<br />
                즐거운 하루 보내고 계신가요?
            </div>
            <div class='logout'>
                <ButtonLogout />
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
import ButtonLogout from '../components/ButtonLogout.vue'
import InfoUser from '../../../components/InfoUser.vue';
import ReviewButton from '../../../components/ReviewButton.vue';
import { mapGetters, mapState } from 'vuex'

export default {
    components: {
        InfoUser,
        ReviewButton,
        ButtonLogout,
    },
    name: 'MyPage',
    computed: {
        ...mapState('user',
        ['token']),
        ...mapGetters('user',[
            'getUserName'
        ]),
    },
}
</script>

<style scoped>
label {
    padding: 20px;
  width: 100px;
  height: 60px;
  border: 1px solid #000000;
  border-radius: 5px;
  display: inline-block;
  cursor: pointer;
}
input[type="checkbox"]:checked + label {
  border-color: green;
  background-color: rgba(255, 0, 0, 0.4);
}
input[type="checkbox"] {
  display: none;
}


a {
    text-decoration: none;
}

.container {
    display: flex;
    flex-direction: column;
    max-width: 500px;
    margin: auto;
    padding: 0 1rem;
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
    border-radius: 0.25rem;
    height: 12vw;
}

.pageTitle {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0px;
    text-align: left;
    font-size: 0.9rem;
}

.userinfo {
    text-align: left;
}

</style>