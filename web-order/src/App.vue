<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="navbar-brand">
        vue-login
      </div>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home">
            <font-awesome-icon
              icon="home" /> Home
          </router-link>
          <router-link to="/mypage">
            <font-awesome-icon
              icon="mypage" /> MyPage
          </router-link>
        </li>
      </div>
      <div
        class="navbar-nav ml-auto"
        v-if="!currentUser">
        <li class="nav-item">
          <a
            href="/register"
            class="nav-link">
            <font-awesome-icon icon="user-plus" /> Sign Up
          </a>
        </li>
        <li class="nav-item">
          <a
            href="/login"
            class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Login
          </a>
        </li>
      </div>

      <div
        class="navbar-nav ml-auto"
        v-if="currentUser">
        <li class="nav-item">
          <a
            href="/profile"
            class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </a>
        </li>
        <li class="nav-item">
          <a
            href
            class="nav-link"
            @click="logOut">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </a>
        </li>
      </div>
    </nav>
    <div class="container">
      <router-view />
    </div>
  </div>
  <router-link to="/login">
    로그인
  </router-link>&nbsp;
  <router-link to="/admin">
    관리자
  </router-link>&nbsp;
  <router-link to="/mypage">
    마이페이지
  </router-link>
</template>

<script>
// import MenuList from './components/MenuList.vue'
// import CartList from './components/CartList.vue'
// import ImageAdd from './components/ImageAdd.vue'
// import LoginForm from './components/LoginForm.vue'
// import OrderList from './components/OrderList.vue'
// import MyPage from './components/MyPage.vue'

export default {
  components: {
    // MenuList,
    // CartList,
    // ImageAdd,
    // LoginForm,
    // OrderList,
    // MyPage
  },
  methods: {

  },
  computed : {
    
  }
}
</script>

<style lang="scss" scoped>
@import './scss/main.scss' 
</style>