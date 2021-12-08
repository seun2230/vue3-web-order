<template>
    <div class='container'>
        <div>
            <p class='pageTitle'>내 정보</p>
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
import InfoUser from '../components/InfoUser.vue';
import InfoAccount from '../components/InfoAccount.vue';

export default {
    components: {
        InfoUser,
        InfoAccount,
    },
    name: 'MyPage',
}
</script>

<style scoped>
a {
    text-decoration: none;
}

.container {
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