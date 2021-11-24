<template>
    <div>
        <h1>HOME</h1>
        {{ loginUserName }}님<br />
        {{ isAuthenticated ? "로그인 되었습니다" : "로그인 해 주세요" }}
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { mapState } from 'vuex';

export default {
    name: 'Index',
    components: {},
    computed: {
        ...mapGetters('user',
            ['isAuthenticated']),
        ...mapState('user', [
            'loginUserEmail', 'loginUserName'
        ])
    },
    methods: {
    },
};
</script>

