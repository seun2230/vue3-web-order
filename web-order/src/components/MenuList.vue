<template>
  <div class="container">
    <h4>
      MENU
    </h4>
    <div class="inner">
      <div
        class="foods">
        <MenuItem
          class="menuCard"
          v-for="food in foods"
          :key="food.food_name"
          :food="food" />
      </div>
    </div>
  </div>
</template>

<script>
import MenuItem from './MenuItem.vue'
import { mapState } from 'vuex'

export default {
  components: {
    MenuItem,
  },
  created: {
    getState() {
      return this.$store.commit("food/getState");
    },
    getOrder() {
      return this.$store.commit("food/getOrder");
    }
  },
  computed: {
    ...mapState('food', [
      'foods'
    ])
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 4px;
}
</style>