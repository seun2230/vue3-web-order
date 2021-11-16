<template>
  <MenuList />
  <CartList />
  <ImageUpload />
  <OrderList />
</template>

<script>
import MenuList from './components/MenuList.vue'
import CartList from './components/CartList.vue'
import ImageUpload from './components/ImageUpload.vue'
import OrderList from './components/OrderList.vue'

export default {
  components: {
    MenuList,
    CartList,
    ImageUpload,
    OrderList
  },
  methods: {

  },
  computed : {
  }
}
</script>