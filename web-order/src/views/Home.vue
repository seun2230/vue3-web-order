<template>
  <div class="contaienr">
    <Header />
    <div class="slide">
     <Slide />
     <SlideMenu />
    </div>
    <div class="content-area">
      <MenuList />

    </div>
  </div>
</template>

<script>
import Header from './Header.vue'
import Slide from '../components/Slide.vue'
import SlideMenu from '../components/SlideMenu.vue'
import MenuList from '../components/MenuList.vue'
export default {
  data() {
    
  },
  components: {
    Header,
    Slide,
    SlideMenu,
    MenuList,
  }
}
</script>

<style scoped lang="scss">
.container {
  margin: 10px auto;
  padding: 20px;
  border: 1px solid #bcbcbc; 
}

</style>