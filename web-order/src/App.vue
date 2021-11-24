<template>  
  <MenuList />
  <CartList />
  <ImageUpload />
  <OrderList />
  <LoginForm />
  <!-- <ImageAdd /> -->

</template>

<script>
import MenuList from './components/MenuList.vue'
import CartList from './components/CartList.vue'
import ImageUpload from './components/ImageUpload.vue'
import OrderList from './components/OrderList.vue'
import LoginForm from './components/LoginForm.vue'
// import ImageAdd from './components/ImageAdd.vue'

export default {
  components: {
    MenuList,
    CartList,
    ImageUpload,
    OrderList,
    // ImageAdd
    LoginForm
  },
  methods: {

  },
  computed : {
  }
}
</script>