<template>
  <div>
    <BottomNavbar />
    <router-view />
  </div>
</template>

<script>
import BottomNavbar from './components/BottomNavbar.vue'

export default {
  components: {
    BottomNavbar
  },
};
</script>

<style lang="scss" scoped>
</style>