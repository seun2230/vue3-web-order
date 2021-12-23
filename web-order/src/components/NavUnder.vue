<template>
  <div class="nav-container">
  <ul>
    <li>
      <router-link to='/' v-slot='{href, navigate}'>
          <button :href='href' @click='navigate' class='button'>
            <div class="navicon"
              :style="{ color: homeColors[this.$route.name] }">
                <icon-base icon-name="IconHome"
                  width="33" height="32">
                  <icon-home />
                </icon-base>
            </div>
            <div class="space">
            </div>
            <div class="navdesc"
              :style="{ color: homeColors[this.$route.name] }">
              홈
            </div>
          </button>
      </router-link>
    </li>
    <li>
      <router-link to='/user/board' v-slot='{href, navigate}'>
          <button :href='href' @click='navigate' class='button'>
            <div class="navicon"
              :style="{ color: reviewColors[this.$route.name] }">
                <icon-base icon-name="IconReview"
                  width="33" height="32">
                  <icon-review />
                </icon-base>
            </div>
            <div class="space">
            </div>
            <div class="navdesc"
              :style="{ color: reviewColors[this.$route.name] }">
              리뷰
            </div>
          </button>
      </router-link>
    </li>
    <li id="orderbtn">
      <router-link to='/user/menu' v-slot='{href, navigate}'>
          <button :href='href' @click='navigate' class='button'>
            <div class="navicon" id="ordericon"
              :style="{ color: orderColors[this.$route.name] }">
                <icon-base icon-name="IconOrder"
                  width="50" height="50">
                  <icon-order />
                </icon-base>
            </div>
            <div class="navdesc" id="order-desc"
              :style="{ color: orderColors[this.$route.name] }">
              주문하기
            </div>
          </button>
      </router-link>
    </li>
    <li>
      <router-link to='/user/mypage' v-slot='{href, navigate}'>
          <button :href='href' @click='navigate' class='button'>
            <div class="navicon"
              :style="{ color: listColors[this.$route.name] }">
                <icon-base
                  icon-name="IconList"
                  width="33" height="32">
                  <icon-list />
                </icon-base>
            </div>
            <div class="space">
            </div>
            <div class="navdesc"
              :style="{ color: listColors[this.$route.name] }">
              주문내역
            </div>
          </button>
      </router-link>
    </li>
    <li>
      <router-link to='/user/userinfo' v-slot='{href, navigate}'>
          <button :href='href' @click='navigate' class='button'>
            <div class="navicon"
              :style="{ color: infoColors[this.$route.name] }">
                <icon-base icon-name="IconInfo"
                  width="33" height="32" >
                  <icon-info />
                </icon-base>
            </div>
            <div class="space">
            </div>
            <div class="navdesc"
              :style="{ color: infoColors[this.$route.name] }">
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
  data() {
    // const thisYellow = 'rgba(255, 150, 0, 1)';
    const thisRed = 'rgba(255, 0, 0, 0.7)';

    return {
      homeColors: {
        home: thisRed,
      },
      reviewColors: {
        review: thisRed,
        board: thisRed,
        boardItem: thisRed
      },
      orderColors: {
        menu: thisRed,
      },
      listColors: {
        mypage: thisRed,
      },
      infoColors: {
        userinfo: thisRed,
        modify: thisRed,
      }
    }
  },
  components: {
    IconBase,
    IconHome,
    IconInfo,
    IconReview,
    IconList,
    IconOrder,
  },
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
  height: 11vh;
  max-height: 11vh;
  z-index:1000;
  border-top: 1px solid #bcbcbc;
  /* border-radius: 10px; */
  background-color: white;
}

@media screen and (max-height: 799px) {
    ul {
      min-height: 14%;
    }
}

.button {
  border: none;
  margin-top: 20px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  align-content: stretch;
  background-color: white;
  width: 70px;
  height: 60px;
  max-width: 18vw;
  cursor: pointer;
}

.navicon {
  /* color: rgba(0, 0, 0, 0.9); */
  transition: ease-out 0.1s;
  transition-duration: 100ms;
  width: 100%;
}

.navicon:active {
  color: rgb(255, 150, 0);
}

.navdesc {
  font-size: 0.7rem;
}

#orderbtn {
  padding-top: 0px;
  height: 65px;
}

#order-desc {
  color: rgb(255, 150, 0);
  font-weight: bold;
}

#ordericon {
  color: rgb(255, 150, 0);
  filter: brightness(100%);
  margin-bottom: 3px;
}

#ordericon:active {
  color: red;
}

.space {
  height: 10px;
}
</style>
