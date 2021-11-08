<template>
    <div class='hello'>
        <div v-for='(user, index) in users' :key='user.user_id' class='user-wrap'>
            <h2>No. {{ index + 1 }}</h2>
            <dl>
                <dt>이메일</dt>
                <dd>{{ user.user_email }}</dd>
                <dt>이름</dt>
                <dd>{{ user.user_name }}</dd>
            </dl>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            users: [],
        };
    },
    created() {
        axios.get('/api/users').then((response) => {
            this.users = response.data;
        });
    },
};
</script>
