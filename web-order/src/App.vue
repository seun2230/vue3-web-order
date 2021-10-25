<template>
  <MenuList />
  <CartList />
  <TotalPrice />
</template>

<script>
import MenuList from './components/MenuList.vue'
import CartList from './components/CartList.vue'
import TotalPrice from './components/TotalPrice.vue'

export default {
  components: {
    MenuList,
    CartList,
    TotalPrice
  },
  methods: {

  }
}
</script>