<template>
    <div class='userInfo'>
        <div class='infoTitle'>
            <p>계정 정보 &nbsp;&nbsp; ></p>
        </div>
        <p>{{ getUserId }}</p>
            <router-link to='/modify' v-slot='{href, route, navigate}'>
                <button :href='href' @click='navigate' class='button'>
                    {{ route.ModifyForm }} 수정
                </button>
        </router-link>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'UserInfo',
    props: {
        userInfo: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    computed: {
        ...mapGetters('user', [
            'getUserId'
        ])
    }
};
</script>

<style scoped>
a {
    text-decoration: none;
}

.userInfo {
    border: 1px solid lightgrey;
    text-align: left;
    font-size: 1rem;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
}

.infoTitle {
    font-size: 1.1rem;
    font-weight: bold;
}

.button {
    background-color: lightsalmon;
    position: relative;
    left: 97px;
    bottom: 5px;
    margin: auto;
    border: none;
    border-radius: .25rem;
    color: white;
    font-weight: bold;
    font-size: 0.9rem;
    display: block;
    width: 3.5rem;
    height: 2rem;
    text-align: center;
    text-decoration-line: none;
    cursor: pointer;
}
</style>
