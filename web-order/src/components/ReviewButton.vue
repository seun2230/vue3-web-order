<template>
    <div class='infoAccount'>
        <div class='router'>
            <router-link to='/user/review' v-slot='{href, navigate}'
            :href='href' @click='navigate'
            class='routerBtn'>
            <div>
                <span class='infoTitle'>리뷰 남기기</span><br />
                <span class="infoBody">메뉴에 대한 평가를 남겨보세요.</span>
            </div>
            <div class="routericon">
                <i class="fas fa-arrow-right fa-2x"></i>
            </div>
        </router-link>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
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
        ...mapState('user', [
            'user_info'
        ])
    }
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
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
}

.routericon{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 10px;
}
</style>
