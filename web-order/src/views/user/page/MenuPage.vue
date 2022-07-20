<template>
  <div class="container">
    <MenuList />
    <CartList />
  </div>
</template>

<script>
import MenuList from '../components/menus/MenuList.vue'
import CartList from '../components/carts/CartList.vue'

export default {
  components: {
    MenuList,
    CartList,
  }
}
</script>

<style lang="scss" scoped>
</style>