<template>
    <div class='userInfo'>
        <div class='infoTitle'>
            <p>사용자 정보 &nbsp; <fa class='fa-title-icon' icon='angle-right' /></p>
        </div>
        <div class='infoBody'>
            <p>{{ getUserData }}</p>
            <p>{{ getMaskedUser.maskedAge }}</p>
            <p>{{ getMaskedUser.maskedPhone }}</p>
                <router-link to='/modify' v-slot='{href, route, navigate}'>
                    <button :href='href' @click='navigate' class='button'>
                        {{ route.ModifyForm }}
                    </button>
            </router-link>
            <fa class='fa-body-icon' :icon="['far', 'user']" />
        </div>
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
    created() {
        this.$store.dispatch('user/maskedUser')
    },
    computed: {
        ...mapGetters('user', [
            'getUserData', 'getMaskedUser'
        ])
    }
};
</script>

<style scoped>
a {
    text-decoration: none;
}

.hr {
    height: 1px;
    border: 0px;
    background-color: lightgray;
}

.infoBody {
    float: left;
}

.infoTitle {
    font-size: 1.1rem;
    font-weight: bold;
}

.userInfo {
    border: 1px solid lightgrey;
    text-align: left;
    font-size: 1rem;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
}

.fa-body-icon {
    /* float: right; */
    position: relative;
    font-size: 3rem;
    color: rgba(185, 170, 45, 0.6);
}

.button {
    position: absolute;
    margin: auto;
    top: 50vw;
    left: 8vw;
    border: none;
    border-radius: .25rem;
    opacity: 1;
    background-color: rgba(255, 255, 255, 0);
    font-weight: bold;
    font-size: 1rem;
    display: block;
    width: 17rem;
    height: 7.8rem;
    text-align: center;
    text-decoration-line: none;
    cursor: pointer;
}
</style>
