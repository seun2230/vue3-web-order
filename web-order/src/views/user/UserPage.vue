<template>
  <div>
    <div class="comp-header">
      <comp-header />
    </div>
    <router-view v-slot="{ Component }">
      <transition name="component-transition" mode="slide">
        <component :is="Component" />
      </transition>
    </router-view>
    <nav-under />
  </div>
</template>

<script>
import NavUnder from '../../components/NavUnder.vue'
import CompHeader from './components/CompHeader.vue';

export default {
  components: {
    NavUnder,
    CompHeader,
  },
};
</script>

<style lang="scss" scoped>
body {
  overflow-y: hidden;
}

.component-transition-enter-to {
  position: absolute;
  right: 0;
}
.component-transition-enter-from {
  position: absolute;
  right: -100%;
}
.component-transition-enter-active {
  transition: all 0.3s cubic-bezier(0.250, 0.100, 0.250, 1.000);
}
.component-transition-leave-to {
  position: absolute;
  left: -100%;
}
.component-transition-leave-from {
  position: absolute;
  left: 0;
}
.component-transition-leave-active {
  transition: all 0.3s cubic-bezier(0.250, 0.100, 0.250, 1.000);
}
</style>
