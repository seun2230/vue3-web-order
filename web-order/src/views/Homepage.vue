<template>
  <div class="contaienr">
    <Header />
      <router-view />
  </div>
</template>

<script>
import Header from '../views/Header.vue'
export default {
  data() {
  },
  components: {
    Header,
  }
}
</script>

<style scoped lang="scss">

body {
  min-height: 100vh;
}

</style>