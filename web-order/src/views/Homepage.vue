<template>
  <div class="container">
    <Header />
    <Slide />
    <br />
    <!-- <Login /> -->
    <PageList />
    <NavUnder />
    <router-link to="/user/login"> login </router-link>
    <router-link to="/user/sign"> sign </router-link>
    <router-link to="/user/menu"> menu </router-link>
    <router-link to="/admin/foodManagement"> admin </router-link>
    <router-link to="/user/board"> board </router-link>
  </div>
</template>
<script>
import Header from './Header.vue'
import Slide from '../components/Slide.vue'
// import Login from '../components/LoginForm.vue'
import PageList from '../components/PageList.vue'
import NavUnder from '../components/NavUnder.vue'
import { mapGetters } from 'vuex'

export default {
  data() {
  },
  components: {
    Header,
    Slide,
    // Login,
    PageList,
    NavUnder,
  },
  computed: {
    ...mapGetters('user',[
      'isAuth'
    ])
  }
}
</script>