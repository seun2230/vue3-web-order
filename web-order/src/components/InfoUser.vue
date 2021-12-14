<template>
 <div class='infoUser'>
        <router-link to='/modify' v-slot='{href, route, navigate}'>
            <button :href='href' @click='navigate' class='button'>
                <div class='infoTitle'>
                    <p>사용자 정보 &nbsp; <fa class='fa-title-icon' icon='angle-right' /></p>
                </div>
                <div class='infoBody'>
                    <p>{{ getUserData }}</p>
                    <p>{{ getMaskedUser.maskedAge }}</p>
                    <p>{{ getMaskedUser.maskedPhone }}</p>
                </div>
                    {{ route.ModifyForm }}
                    <fa class='fa-body-icon' icon='user' />
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
    created() {
        this.$store.dispatch('userInfo/maskedUser')
    },
    computed: {
        ...mapGetters('userInfo', [
            'getMaskedUser'
        ])
    }
};
</script>

<style scoped>
a {
    text-decoration: none;
}

.infoBody {
    grid-template-rows: 30px;
    grid-template-columns: 10px;
}

.infoTitle {
    font-size: 1.1rem;
    font-weight: bold;
}

.infoUser {
    display: flex;
    flex-direction: row;
    padding: 0px 5px;
    border: 1px solid lightgrey;
    text-align: left;
    height: 8.5rem;
    font-size: 1rem;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
}

.fa-body-icon {
    font-size: 3rem;
    color: rgba(185, 170, 45, 0.6);
}

.button {
    border: none;
    border-radius: .25rem;
    opacity: 1;
    background-color: rgba(255, 255, 255, 0);
    font-weight: bold;
    font-size: 1rem;
    display: block;
    width: 80vw;
    height: 40vw;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
}
</style>
