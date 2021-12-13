<template>
  <div class="contaienr">
    <Header />
    <Slide />
    <Login />
  </div>
</template>

<script>
import Header from './Header.vue'
import Slide from '../components/Slide.vue'
import Login from '../components/LoginForm.vue'

export default {
  data() {
  },
  components: {
    Header,
    Slide,
    Login
  }
}
</script>

<style scoped lang="scss">

body {
  min-height: 100vh;
}

</style>