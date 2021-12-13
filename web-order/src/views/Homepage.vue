<template>
  <div class="contaienr">
    <Header />
    <Content />  
  </div>
</template>

<script>
import Header from './Header.vue'
import Content from '../views/user/page/Content.vue'
export default {
  data() {
  },
  components: {
    Header,
    Content
  }
}
</script>

<style scoped lang="scss">

body {
  min-height: 100vh;
}

</style>