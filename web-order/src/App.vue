<template>
  <!-- <MenuList />
  <CartList />
  <ImageAdd />
  <LoginForm />
  <OrderList />
  <MyPage /> -->
  <router-view />
    
  <router-link to="/home">
    Home
  </router-link>&nbsp;
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