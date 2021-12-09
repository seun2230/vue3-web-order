<template>
  <MenuList />
  <CartList />
</template>

<script>
import MenuList from '../components/Menulist.vue'
import CartList from '../components/CartList.vue'

export default {
  components: {
    MenuList,
    CartList
  }
}
</script>