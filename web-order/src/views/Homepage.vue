<template>
  <div class="container">
    <!-- <Header /> -->
    <div class="slide-container">
      <Slide />
    </div>
    <!-- <Login /> -->
    <div class="pagelist-container">
      <PageList />
    </div>
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
body {
  max-height: 100vh;
  margin: 0px;
  padding: 0px;
}

.container {
  display: flex;
  flex-direction: column;
}
</style>
