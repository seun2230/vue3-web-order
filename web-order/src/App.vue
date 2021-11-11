<template>
  <MenuList />
  <CartList />
  <ImageUpload />
</template>

<script>
import MenuList from './components/MenuList.vue'
import CartList from './components/CartList.vue'
import ImageUpload from './components/ImageUpload.vue'


export default {
  components: {
    MenuList,
    CartList,
    ImageUpload
  },
  methods: {

  },
  computed : {
  }
}
</script>