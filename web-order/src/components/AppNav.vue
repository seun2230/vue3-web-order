<template>
    <div id='nav'>
        <router-link to="/">
            Home
        </router-link>
        <router-link to="/login">
            Login
        </router-link>
        <router-link to="/signup">
            signUp
        </router-link>
        <button class='logout' @click='logout'>
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
