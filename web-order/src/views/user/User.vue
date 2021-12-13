<template>
  <div>
    <Header />
    <HomePage />
    <router-view v-slot="{ Component }">
      <transition name="component-transition" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
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