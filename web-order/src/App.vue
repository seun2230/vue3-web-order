<template>
  <MenuList />
  <CartList />
  <ImageAdd />
</template>

<script>
import MenuList from './components/MenuList.vue'
import CartList from './components/CartList.vue'
import ImageAdd from './components/ImageAdd.vue'

export default {
  components: {
    MenuList,
    CartList,
    ImageAdd
  },
  methods: {

  },
  computed : {
    
  }
}
</script>