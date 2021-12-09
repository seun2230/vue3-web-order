<template>
  <div class="contaienr">
    <Header />
    <div class="slide">
     <Slide />
    </div>
    <section>
      <Category />
    </section>
    <section>
      <Descript />
      <Review />
    </section>
  </div>
</template>

<script>
import Header from './Header.vue'
import Slide from '../components/Slide.vue'
import Category from '../components/Category.vue'
import Descript from '../components/Descript.vue'
import Review from '../components/Review.vue'
export default {
  data() {
  },
  components: {
    Header,
    Slide,
    Category,
    Descript,
    Review
  }
}
</script>

<style scoped lang="scss">

body {
  min-height: 100vh;
}
section {
  // padding: 2rem 9%;
}

</style>