<template>
    <div class='hello'>
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
    </div>
</template>
<script>
import axios from 'axios';

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
        login: function (event) {
            axios.post('/api/users/login', {
                user: this.user,
            })
            .then(
                (res) => {
                    alert(res.data.message);
                },
                (err) => {
                    alert('Login failed!');
                },
            )
            .catch((err) => {
                alert(err);
            });
        },
    },
};
</script>
