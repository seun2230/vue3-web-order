<template>
    <div class='hello'>
        <form class='form' @submit.prevent="login">
        <div class='input_row'>
            <label for='email'>이메일</label>
            <input type='email' id='email' v-model='user.user_email' />
        </div>
        <div class='input_row'>
            <label for='password'>비밀번호</label>
            <input type='password' id='password' v-model='user.user_password' />
        </div>
        <button v-on:click='login'>로그인</button>
        <a href='/#/signup'>가입하기</a>
        </form>
    </div>
</template>
<script>
// import axios from 'axios';

export default {
    data() {
        return {
            user: {
                user_email: '',
                user_password: '',
            },
        };
    },
    methods: {
        login() {
            try {
                const loginData = {
                    user_email: this.user.user_email,
                    user_password: this.user.user_password,
                };
                this.$store.dispatch('login', loginData)
                .then(() => {
                    this.$router.push('/');
                })
            } catch (error) {
                console.log('error on Front: ', error.res)
            }
        },
    }
};
</script>
