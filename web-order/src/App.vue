<template>
  <MenuList />
  <CartList />
  <ImageAdd />
  <Login />
</template>

<script>
import MenuList from './components/MenuList.vue'
import CartList from './components/CartList.vue'
import ImageAdd from './components/ImageAdd.vue'
import Login from './components/login.vue'

export default {
  components: {
    MenuList,
    CartList,
    ImageAdd,
    Login
  },
  methods: {

  },
  computed : {
    
  }
}
</script>