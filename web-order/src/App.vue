<template>
  <MenuList />
  <CartList />
  <ImageAdd />
  <Login />
  <OrderList />
</template>

<script>
import MenuList from './components/MenuList.vue'
import CartList from './components/CartList.vue'
import ImageAdd from './components/ImageAdd.vue'
import Login from './components/login.vue'
import OrderList from './components/OrderList.vue'

export default {
  components: {
    MenuList,
    CartList,
    ImageAdd,
    Login,
    OrderList
  },
  methods: {

  },
  computed : {
    
  }
}
</script>