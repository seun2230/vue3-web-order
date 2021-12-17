<template>
 <div class='infoUser'>
        <router-link to='/user/modify' v-slot='{href, navigate}'
            :href='href' @click='navigate'
            class='routerBtn'>
            <div>
                <span class='infoTitle'>회원정보 수정</span><br />
                <span class="infoBody">내 개인정보를 수정하세요.</span>
            </div>
            <!-- <div class='infoBody'>
                <p>{{ getUserData }}</p>
                <p>{{ getMaskedUser.maskedAge }}</p>
                <p>{{ getMaskedUser.maskedPhone }}</p>
            </div> -->
            <div class="routericon">
                <i class="fas fa-arrow-right fa-2x"></i>
            </div>
        </router-link>
    </div>
</template>

<script>
// import { mapGetters } from 'vuex';

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
    // created() {
    //     this.$store.dispatch('userInfo/maskedUser')
    // },
    // computed: {
    //     ...mapGetters('userInfo', [
    //         'getMaskedUser'
    //     ])
    // }
};
</script>

<style scoped>
.infoBody {
    display: flex;
    flex-direction: column;
    padding: 10px;
}

.infoTitle {
    display: flex;
    flex-direction: column;
    padding: 10px;
    font-size: 1.1rem;
    font-weight: bold;
    text-align: left;
}

.fa-body-icon {
    font-size: 3rem;
    color: rgba(185, 170, 45, 0.6);
}

.routerBtn {
    background-color: rgba(255, 255, 255, 0);
    opacity: 1;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border: 1px solid lightgrey;
    text-align: left;
    height: 6.5rem;
    width: 100%;
    font-size: 1rem;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
}

.routericon{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 10px;
}
</style>
