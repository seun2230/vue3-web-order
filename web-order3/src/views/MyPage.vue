<template>
    <div class='container'>
        <h2>마이페이지</h2>
        <router-link to='/modify' v-slot='{href, route, navigate}'>
            <button :href='href' @click='navigate' class='button'>
                {{ route.ModifyForm }} 회원 정보 수정
            </button>
        </router-link>
        <br />
        <router-link to='/orderHistory' v-slot='{href, route, navigate}'>
            <button :href='href' @click='navigate' class='button'>
                {{ route.OrderHistory }} 주문 내역
            </button>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'MyPage',
}
</script>

<style scoped>
a {
    text-decoration: none;
}

.container {
    max-width: 460px;
    margin: 3rem auto;
    padding: 3rem;
    border: 1px solid #ddd;
    border-radius: .25rem;
    background-color: white;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
        0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.button {
    background-color: royalblue;
    padding: 1rem 2rem;
    margin: auto;
    border: none;
    border-radius: .25rem;
    color: white;
    font-weight: bold;
    display: block;
    width: 50%;
    height: 7rem;
    text-align: center;
    cursor: pointer;
}

.button:hover {
    filter: brightness(110%);
}
</style>