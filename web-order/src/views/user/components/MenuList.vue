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
@import "../../../scss/variables.scss";

.container {
  display: flex;
  background-color: rgb(241, 237, 220);
  border-radius: 9px;
  margin-bottom: 10px;
  .foods {
    display: grid;
    width: 100%;
  }
}
</style>