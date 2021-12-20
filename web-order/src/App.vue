<template>
  <router-view v-slot="{ Component }">
        <transition name="component-transition" mode="out-in">
          <component :is="Component" />
        </transition>
        <div class="nav" v-if="this.$route.meta.RootName!='admin'">
          <nav-under />
        </div>
        <div v-else>
        </div>
      </router-view>
</template>

<script>
import NavUnder from './components/NavUnder.vue'
export default {
  name: "App",
  components: {
    NavUnder
  },
  mounted: function () {
    console.log('router', this.$route.meta.RootName);
    return this.$route.meta.RootName;
  },
  data: () => ({
  }),
};
</script>

<style lang="scss" scoped>
body {
  margin: 0px;
  padding: 0px;
}

.component-transition-enter-active,
.component-transition-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.component-transition-enter,
.component-transition-leave-active {
  opacity: 0
}
</style>