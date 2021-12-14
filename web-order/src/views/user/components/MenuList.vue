<template>
  <div class="container">
    <div class="foods">
      <MenuItem 
        v-for="food in foods" 
        :key="food.food_name" 
        :food="food" />
    </div>
  </div>
</template>

<script>
import MenuItem from "./MenuItem.vue";
import { mapState } from "vuex";

export default {
  data() {
    return {
    }
  },
  components: {
    MenuItem,
  },
  created() {
    this.$store.commit("food/getState");
  },
  computed: {
    ...mapState("food", ["foods"]),
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  .foods {
    display: grid;
    width: 100%;
  }
}
</style>