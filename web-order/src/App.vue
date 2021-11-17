<template>
  <MenuList />
  <CartList />
  <ImageUpload />
  <OrderList />
  <!-- <ImageAdd /> -->

</template>

<script>
import MenuList from './components/MenuList.vue'
import CartList from './components/CartList.vue'
import ImageUpload from './components/ImageUpload.vue'
import OrderList from './components/OrderList.vue'
// import ImageAdd from './components/ImageAdd.vue'

export default {
  components: {
    MenuList,
    CartList,
    ImageUpload,
    OrderList,
    // ImageAdd
  },
  methods: {

  },
  computed : {
  }
}
</script>