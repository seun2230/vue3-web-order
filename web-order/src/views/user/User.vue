<template>
  <div>
    <Header />
    <HomePage />
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import HomePage from '../Homepage.vue'

export default {
  components: {
    Header,
    HomePage
  },
};
</script>

<style lang="scss" scoped>
</style>