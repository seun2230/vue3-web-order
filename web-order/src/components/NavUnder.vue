<template>
  <ul>
    <li>
      <router-link to='/' v-slot='{href, navigate}'>
          <button :href='href' @click='navigate' class='button'>
            <div class="navicon">
                <icon-base icon-name="IconHome">
                  <icon-home />
                </icon-base>
            </div>
          </button>
      </router-link>
    </li>
    <li>
      <router-link to='/modify' v-slot='{href, navigate}'>
          <button :href='href' @click='navigate' class='button'>
            <div class="navicon">
                <i class="fas fa-hamburger fa-2x"></i>
            </div>
          </button>
      </router-link>
    </li>
    <li id="orderbtn">
      <router-link to='/user/menu' v-slot='{href, navigate}'>
          <button :href='href' @click='navigate' class='button'>
            <div class="navicon" id="ordericon">
                <i class="fas fa-utensils fa-2x"></i>
            </div>
          </button>
      </router-link>
    </li>
    <li>
      <router-link to='/user/mypage' v-slot='{href, navigate}'>
          <button :href='href' @click='navigate' class='button'>
            <div class="navicon">
                <!-- <icon-base icon-name="IconWrite">
                  <icon-write />
                </icon-base> -->
            </div>
          </button>
      </router-link>
    </li>
    <li>
      <router-link to='/user/userinfo' v-slot='{href, navigate}'>
          <button :href='href' @click='navigate' class='button'>
            <div class="navicon">
                <icon-base icon-name="IconInfo">
                  <icon-info />
                </icon-base>
            </div>
          </button>
      </router-link>
    </li>
  </ul>
</template>

<script>
import IconBase from "../assets/navicons/IconBase.vue"
import IconHome from '../assets/navicons/IconHome.vue'
import IconInfo from '../assets/navicons/IconInfo.vue'

export default {
  components: {
    IconBase,
    IconHome,
    IconInfo,
  }
}
</script>

<style scoped>
icon-base {
  width: 30px;
}
ul {
  list-style: none;
  position: fixed;
  display: flex;
  justify-content: space-around;
  margin: 0px;
  padding: 0px 10px 60px 10px;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 50px;
  z-index:100;
  border-top: 1px solid #bcbcbc;
  background-color: white;
}

li {
  width: 20%;
  height: 100%;
  text-align: center;
  padding-top: 13px;
}

.button {
  border: none;
  border-radius: 0.5rem;
  background-color: white;
}

.navicon {
  color: rgba(0, 0, 0, 0.8)
}

.navicon:hover {
  color: darkgoldenrod;
  cursor: pointer;
}

#orderbtn {
  padding-top: 5px;
}

#ordericon {
  color: rgba(255, 0, 0, 0.8);
  font-size: 1.5rem;
  animation: shake 1.5s infinite;
}

@keyframes shake {
	0%{
		transform: translate(1px, 1px) rotate(0deg);
	}
	10%{
		transform: translate(-1px, -1px) rotate(1deg);
	}
	20%{
		transform: translate(-2px, 1px) rotate(-1deg);
	}
	30%{
		transform: translate(1px, 2px) rotate(0deg);
	}
	40%{
		transform: translate(-1px, 1px) rotate(1deg);
	}
	50%{
		transform: translate(1px, -1px) rotate(-2deg);
	}
	60%{
		transform: translate(2px, 1px) rotate(1deg);
	}
	70%{
		transform: translate(-1px, 2px) rotate(2deg);
	}
	80%{
		transform: translate(2px, -1px) rotate(1deg);
	}
	90%{
		transform: translate(-1px, 2px) rotate(0deg);
	}
	100%{
		transform: translate(2px, 1px) rotate(-1deg);
	}
}

#ordericon:hover {
  color: green;
}
</style>
