<template>
    <div class='userInfo'>
        <div class='infoTitle'>
            <p>계정 정보 &nbsp;&nbsp; ></p>
        </div>
        <div class='infoBody'>
            <p>{{ getUserId }}</p>
                <router-link to='/modify' v-slot='{href, route, navigate}'>
                    <button :href='href' @click='navigate' class='button'>
                        {{ route.ModifyForm }}
                            <fa class='fa-body-icon' icon='user-cog' />
                    </button>
            </router-link>
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
    computed: {
        ...mapGetters('user', [
            'getUserId'
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
    padding: 0px 5px;
    border: 1px solid lightgrey;
    text-align: left;
    height: 8.5rem;
    font-size: 1rem;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
}

.userInfo::after {
    display: block;
    content: "";
    clear: both;
}

.fa-body-icon {
    float: right;
    position: relative;
    font-size: 3rem;
    color: rgba(185, 170, 45, 0.6);
}

.button {
    position: relative;
    padding: 0px 10px;
    top: 50vw;
    left: 8vw;
    border: none;
    border-radius: .25rem;
    opacity: 1;
    background-color: rgba(255, 255, 255, 0);
    font-weight: bold;
    font-size: 1rem;
    display: block;
    width: 85vw;
    height: 40vw;
    text-align: center;
    text-decoration-line: none;
    cursor: pointer;
}
</style>
