<template>
  <div class="container">
    <div class="inner">
      <div class="foods">
        <MenuItem
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
      MenuItem
    },
    created() {
      this.$store.commit("food/getState");
      this.$store.commit("food/getOrder")
    },
    computed: {
      ...mapState('food', [
          'foods'
      ])
    }
}
</script>

<style lang="scss" scoped>
@import "../scss/main.scss";

.container {
  margin-top: 30px;
  .inner{
    background-color: $gray-200;
    padding: 10px 0;
    border-radius: 4px;
    text-align: center;
    &.no-result {
      padding: 70px 0;
    }
  }
  .foods {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>