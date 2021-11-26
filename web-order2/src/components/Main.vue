<template>
    <div>
        <h1>HOME</h1>
        <!-- {{ userName }}<br /> -->
        {{ loginUserName }}<br />
        {{ isAuthenticated ? "로그인 되었습니다" : "로그인 해 주세요" }}
    </div>
</template>
<script>
// import http from '../api/interceptor';
import { mapGetters } from 'vuex';
import { mapState } from 'vuex';

export default {
    name: 'Index',
    components: {},
    computed: {
        ...mapGetters('user',
            ['isAuthenticated']),
        ...mapState('user', [
            'loginUserName'
        ])
    },
    methods: {},
    // created() {
    //     http
    //     .get('api/users/getUserName')
    //     .then(response => {
    //         const userName = response.data[0].user_name
    //         console.log('userName:', userName)
    //         return userName;
    //     })
    // }
};
</script>

