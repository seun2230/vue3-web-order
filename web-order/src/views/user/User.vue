<template>
  <div>
    <Header />
    <HomePage />
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header.vue'

import HomePage from '../HomePage.vue'
export default {
  components: {
    Header,
    HomePage
  },
};
</script>

<style lang="scss" scoped>
</style>