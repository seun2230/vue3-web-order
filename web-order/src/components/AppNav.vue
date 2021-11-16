<template>
    <div id='nav'>
        <router-link to="/">
            Home
        </router-link>
        <router-link v-if='!loggedIn' to="/login">
            Login
        </router-link>
        <router-link v-if='loggedIn' to="/mypage">
            MyPage
        </router-link>
        <router-link v-if='!loggedIn' to="/signup">
            signUp
        </router-link>
        <button v-if='loggedIn' class='logout' @click='logout'>
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
