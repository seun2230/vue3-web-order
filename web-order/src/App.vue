<template>
  <div class="container">
    <router-view v-slot="{ Component }">
      <transition name="component-transition" mode="out-in">
        <component :is="Component" />
      </transition>
      <div class="nav" v-if="this.$route.meta.RootName!='admin'">
        <nav-under />
      </div>
    </router-view>
  </div>
</template>

<script>
import NavUnder from './components/NavUnder.vue'
import VueHead from 'vue-head'

export default {
  name: "App",
  components: {
    NavUnder,
    VueHead,
  },
  mounted: function () {
    console.log('router', this.$route.meta.RootName);
    return this.$route.meta.RootName;
  },
  data: () => ({
  }),
  head: {
    title: function () {
      return {
        inner: this.title,
        seperator: '|',
        complement: 'subtitle'
      }
    },
    meta: function () {
      return [
        { name: 'viewport', content: 'width=device-width,initial-scale=1.0,user-scalable=no' }
      ]
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
}

@media screen and (max-width: 1023px) {
  .container {
    height: 50vh;
  }
}

// @media screen and (min-width: 767px) {
//   .container {
//     height: 20vh;
//   }
// }

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