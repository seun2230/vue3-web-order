<template>
<<<<<<< HEAD:web-order/src/views/user/page/Menu.vue
  <MenuList />
  <CartList />
</template>

<script>
import MenuList from '../components/Menulist.vue'
import CartList from '../components/CartList.vue'

=======
  <div class="contaienr">
    <Header />
    <div class="slide">
     <Slide />
    </div>
    <section>
      <Category />
    </section>
      <Descript />
      <MyPage />
  </div>
</template>

<script>
import Header from './Header.vue'
import Slide from '../components/Slide.vue'
import Category from '../components/Category.vue'
import Descript from '../components/Descript.vue'
import MyPage from './MyPage.vue'
>>>>>>> nse-develop:web-order/src/views/Home.vue
export default {
  data() {
  },
  components: {
    Header,
    Slide,
    Category,
    Descript,
    MyPage
  }
}
</script>

<style scoped lang="scss">

body {
  min-height: 100vh;
}

</style>