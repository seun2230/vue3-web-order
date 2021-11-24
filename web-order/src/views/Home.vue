<template>
  <h1>
    HOME임
  </h1>
  <MenuList />
  <CartList />
</template>

<script>
import MenuList from '../components/MenuList.vue'
import CartList from '../components/CartList.vue'

export default {
  components: {
    MenuList,
    CartList
  }
}
</script>