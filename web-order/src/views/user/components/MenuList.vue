<template>
  <div>
    <span 
      class="menu-total">전체</span>
    <div 
      class="section-category"
      v-for="item in getCategoryName"
      :key="item">
      <span 
        class="category__item"
        @click="test(item)">
        {{ item }}
      </span>
    </div>
    <div class="section-menu">
      <div class="foods">
        <MenuItem 
          v-for="food in category" 
          :key="food.food_category" 
          :food="food" /> 
      </div>
    </div>
  </div>
</template>

<script>
import MenuItem from "./MenuItem.vue";
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    MenuItem,
  },
  created() {
    this.$store.commit("food/getState");
  },
  computed: {
    ...mapState("food", ["foods"]),
    ...mapState("food", ["category"]),
    ...mapGetters("food", ["getCategoryName"]),
  },
  methods: {   
    test(category) {
      console.log("check", category);
      this.$store.commit('food/getCategory', category);
    },
    getTotalFood(foods) {
      console.log("foods", foods);
    } 
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/variables.scss";
.section-menu {
  .foods {
    display: grid;
    grid-template-columns: 210px 210px;
    grid-template-rows: 270px;
    margin-bottom: 10px;
  }
}
.menu-total {
  width: 80px;
  padding: .2rem;
  margin-top: 5px;
  margin-left: 5px;
  background-color: $gray-300;
  border-radius: .5rem;
  text-align: center;
}
.section-category {
  width: 80px;
  margin: 10px 5px;
  display: inline-block;
  .category__item {
    display: block;
    width: 80px;
    padding: .2rem;
    background-color: $gray-300;
    border-radius: .5rem;
    text-align: center;
  }
  .category__item:hover {
    display: block;
    width: 80px;
    background-color: #fac146;
    border-radius: .5rem;
  }
}
</style>