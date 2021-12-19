<template>
  <router-view v-slot="{ Component }">
        <transition name="component-transition" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
</template>

<script>
export default {
  name: "App",
  components: {
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