<template>
  <v-app>
    <v-main>
      <Menulist />
      <AddFood />
      <BottomNav />
    </v-main>
  </v-app>
</template>

<script>
import Menulist from './components/MenuList.vue'
import AddFood from './components/AddFood.vue'
import BottomNav from './components/BottomNav.vue'

export default {
  name: 'App',

  components: {
    Menulist,
    AddFood,
    BottomNav
  },

  data: () => ({
    //
  }),
}
</script>
