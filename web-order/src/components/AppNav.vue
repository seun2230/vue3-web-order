<template>
    <div id='nav'>
        <router-link to="/">
            Home
        </router-link>
        <router-link v-if='!isAuthenticated' to="/login">
            Login
        </router-link>
        <router-link v-if='isAuthenticated' to="/mypage">
            MyPage
        </router-link>
        <router-link v-if='!isAuthenticated' to="/signup">
            signUp
        </router-link>
        <button v-if='isAuthenticated' class='logout' @click='logout'>
            LogOut
        </button>
    </div>
</template>

<script>
import { authComputed } from '../store/helper.js';

export default {
    computed: {
        ...authComputed
    },
    methods: {
        logout() {
            this.$store.dispatch('logout');
        }
    }
};
</script>
