<template>
  <div class="contaienr">
    <Header />
    <Slide />
    <Login />
    <PageList />
    <NavUnder />
  </div>
</template>
<script>
import Header from './Header.vue'
import Slide from '../components/Slide.vue'
import Login from '../components/LoginForm.vue'
import PageList from '../components/PageList.vue'
import NavUnder from '../components/NavUnder.vue'

export default {
  data() {
  },
  components: {
    Header,
    Slide,
    Login,
    PageList,
    NavUnder,
  }
}
</script>