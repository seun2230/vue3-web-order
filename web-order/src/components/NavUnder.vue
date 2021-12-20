<template>
  <div class="container">
  <ul>
    <li>
      <router-link to='/' v-slot='{href, navigate}'>
          <button :href='href' @click='navigate' class='button'>
            <div class="navicon">
                <icon-base icon-name="IconHome"
                  width="40" height="35">
                  <icon-home />
                </icon-base>
            </div>
            <div class="space">
            </div>
            <div class="navdesc">
              홈
            </div>
          </button>
      </router-link>
    </li>
    <li>
      <router-link to='/user/board' v-slot='{href, navigate}'>
          <button :href='href' @click='navigate' class='button'>
            <div class="navicon">
                <icon-base icon-name="IconReview"
                  width="40" height="35">
                  <icon-review />
                </icon-base>
            </div>
            <div class="space">
            </div>
            <div class="navdesc">
              리뷰
            </div>
          </button>
      </router-link>
    </li>
    <li id="orderbtn">
      <router-link to='/user/menu' v-slot='{href, navigate}'>
          <button :href='href' @click='navigate' class='button'>
            <div class="navicon" id="ordericon">
                <icon-base icon-name="IconOrder"
                  width="50" height="50">
                  <icon-order />
                </icon-base>
            </div>
            <div class="navdesc">
              주문하기
            </div>
          </button>
      </router-link>
    </li>
    <li>
      <router-link to='/user/mypage' v-slot='{href, navigate}'>
          <button :href='href' @click='navigate' class='button'>
            <div class="navicon">
                <icon-base icon-name="IconList"
                  width="40" height="35">
                  <icon-list />
                </icon-base>
            </div>
            <div class="space">
            </div>
            <div class="navdesc">
              주문내역
            </div>
          </button>
      </router-link>
    </li>
    <li>
      <router-link to='/user/userinfo' v-slot='{href, navigate}'>
          <button :href='href' @click='navigate' class='button'>
            <div class="navicon">
                <icon-base icon-name="IconInfo"
                  width="40" height="35" >
                  <icon-info />
                </icon-base>
            </div>
            <div class="space">
            </div>
            <div class="navdesc">
              내 정보
            </div>
          </button>
      </router-link>
    </li>
  </ul>
  </div>
</template>

<script>
import IconBase from '../assets/navicons/IconBase.vue'
import IconHome from '../assets/navicons/IconHome.vue'
import IconInfo from '../assets/navicons/IconInfo.vue'
import IconReview from '../assets/navicons/IconReview.vue'
import IconList from '../assets/navicons/IconList.vue'
import IconOrder from '../assets/navicons/IconOrder.vue'

export default {
  components: {
    IconBase,
    IconHome,
    IconInfo,
    IconReview,
    IconList,
    IconOrder,
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  position: fixed;
  display: flex;
  justify-content: space-around;
  margin: 0px;
  padding: 0px;
  bottom: 0px;
  width: 100%;
  height: 10vh;
  max-height: 10vh;
  z-index:100;
  border-top: 1px solid #bcbcbc;
  border-radius: 10px;
  background-color: white;
}

@media screen and (max-height: 799px){
    ul {
      min-height: 11%;
    }
}

.button {
  border: none;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  align-content: stretch;
  background-color: white;
  width: 70px;
  height: 60px;
  max-width: 18vw;
}

.navicon {
  color: rgba(0, 0, 0, 0.9)
}

.navicon:hover {
  color: darkgoldenrod;
  cursor: pointer;
}

.navdesc {
  font-size: 0.7rem;
}

#orderbtn {
  padding-top: 0px;
  height: 65px;
}

#ordericon {
  color: rgb(255, 201, 0);
  filter: brightness(100%);
  margin-bottom: 3px;
}

#ordericon:hover {
  color: green;
}

.space {
  height: 10px;
}
</style>
