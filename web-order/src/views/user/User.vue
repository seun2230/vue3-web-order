<template>
  <div>
    <HomePage />
    <router-view />
  </div>
</template>

<script>

import HomePage from '../HomePage.vue'
export default {
  components: {
    HomePage
  },
};
</script>

<style lang="scss" scoped>
</style>