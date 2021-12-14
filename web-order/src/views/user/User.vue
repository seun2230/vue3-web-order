<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header.vue'
export default {
  components: {
    Header
  },
};
</script>

<style lang="scss" scoped>
body {
  overflow-x: hidden;
}

.component-transition-enter-from {
  opacity: 0;
}
.component-transition-enter-active {
  transition: all 0.3s ease;
}
.component-transition-leave-to {
  opacity: 0;
}
.component-transition-leave-active {
  transition: all 0.3s ease;
}
</style>