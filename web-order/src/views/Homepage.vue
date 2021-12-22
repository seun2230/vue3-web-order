<template>
  <div class="home-container">
    <div class="slide-container">
      <Slide />
    </div>
    <div class="pagelist-container">
      <PageList />
    </div>
  </div>
</template>
<script>
import Slide from '../components/Slide.vue'
import PageList from '../components/PageList.vue'
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
  height: 78vh;
}

@media screen and (max-height: 799px) {
  .home-container {
    height: 140vh;
  }
}

</style>
