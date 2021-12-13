<template>
  <div class="contaienr">
    <Header />
    <Slide />
    <Login />
    <Content />  
  </div>
</template>

<script>
import Header from './Header.vue'
import Slide from '../components/Slide.vue'
import Login from '../components/LoginForm.vue'

import Content from '../views/user/page/Content.vue'
export default {
  data() {
  },
  components: {
    Header,
    Slide,
    Login,
    Content
  }
}
</script>

<style scoped lang="scss">

body {
  min-height: 100vh;
}

</style>