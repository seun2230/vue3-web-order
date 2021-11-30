<template>
  <v-app>
    <v-main>
      <Menulist />
      <AddFood />
    </v-main>
  </v-app>
</template>

<script>
import Menulist from './components/MenuList.vue'
import AddFood from './components/AddFood.vue'

export default {
  name: 'App',

  components: {
    Menulist,
    AddFood
  },

  data: () => ({
    //
  }),
}
</script>
