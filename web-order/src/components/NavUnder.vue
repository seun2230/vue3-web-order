<template>
  <ul>
    <li>
      <router-link to='/' v-slot='{href, navigate}'>
          <button :href='href' @click='navigate' class='button'>
            <div class="navicon">
                <i class="fas fa-home fa-2x"></i>
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
      <router-link to='/modify' v-slot='{href, navigate}'>
          <button :href='href' @click='navigate' class='button'>
            <div class="navicon">
                <i class="fas fa-receipt fa-2x"></i>
            </div>
          </button>
      </router-link>
    </li>
    <li>
      <router-link to='/user/userinfo' v-slot='{href, navigate}'>
          <button :href='href' @click='navigate' class='button'>
            <div class="navicon">
                <i class="fas fa-user fa-2x"></i>
            </div>
          </button>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {

}
</script>

<style scoped>
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
  border-top: 1px solid gray;
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
}

#ordericon:hover {
  color: green;
}
</style>
