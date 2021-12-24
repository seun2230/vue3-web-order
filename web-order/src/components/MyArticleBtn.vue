<template>
    <div class='infoAccount'>
        <div class='router'>
            <router-link to='/user/myarticle' v-slot='{href, navigate}'
            :href='href' @click='navigate'
            class='routerBtn'>
            <div>
                <span class='infoTitle'>좋아요를 누른 게시물</span><br />
                <span class="infoBody">관심 있는 리뷰를 모아보세요.</span>
            </div>
            <div class="routericon">
                <i class="fas fa-arrow-right fa-2x"></i>
            </div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {

}
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
    text-align: left;
    height: 6.5rem;
    width: 100%;
    font-size: 1rem;
    border: 1px solid lightgrey;
    border-radius: 10px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
    transition: ease-out 300ms;
    transition-duration: 300ms;
}

.routerBtn:active {
    background-color: rgba(0, 0, 0, 0.1);
}

.routericon{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 10px;
}
</style>
