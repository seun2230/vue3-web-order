<template>
  <div class="container">
    <!-- <Header /> -->
    <Slide />
    <br />
    <!-- <Login /> -->
    <PageList />
    <!-- <NavUnder /> -->
  </div>
</template>
<script>
// import Header from './Header.vue'
import Slide from '../components/Slide.vue'
import PageList from '../components/PageList.vue'
// import NavUnder from '../components/NavUnder.vue'
import { mapGetters } from 'vuex'

export default {
  data() {
  },
  components: {
    // Header,
    Slide,
    // Login,
    PageList,
    // NavUnder,
  },
  computed: {
    ...mapGetters('user',[
      'isAuth'
    ])
  }
}
</script>

<style scoped>
  * {
    max-height: 100vh;
  }
</style>