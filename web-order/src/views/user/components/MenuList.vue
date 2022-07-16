<template>
  <div class="container">
    <div class="category">
      <span
        class="category-total"
        @click="getTotalFood()">
        전체
      </span>
      <div 
        class="section-category"
        v-for="item in getCategoryName"
        :key="item">
        <span 
          class="category__item"
          @click="getCategoryItem(item)">
          {{ item }}
        </span>
      </div>
    </div>
    <div 
      class="section-menu menu__foods"
      v-if="showTotalFood">
      <MenuItem 
        v-for="food in foods" 
        :key="food.food_name" 
        :food="food" /> 
    </div>
    <div 
      class="section-menu menu__foods"
      v-if="showEachFood">
      <MenuItem
        v-for="food in category" 
        :key="food.food_category" 
        :food="food" /> 
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
  data() {
    return {
      showTotalFood: true,
      showEachFood: false
    }
  },
  computed: {
    ...mapState("food", ["foods"]),
    ...mapState("food", ["category"]),
    ...mapGetters("food", ["getCategoryName"]),
  },
  methods: {  
    getCategoryItem(category) {
      this.$store.commit('food/getCategory', category);
      this.showTotalFood = false;
      this.showEachFood = true;
    },
    getTotalFood() {
      this.showTotalFood = true;
      this.showEachFood = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/variables.scss";

.section-menu {
  &.menu__foods {
    display: grid;
    grid-template-columns: 210px 210px;
    grid-template-rows: 270px;
  }
}
.category {
  font-size: 1.2rem;
  margin: 10px;
  padding: 5px;
  .category-total {
    margin-right: 8px;
    width: 80px auto;
    padding: .5rem;
    background-color: $gray-300;
    border-radius: .5rem;
    text-align: center;
    &:hover {
      background-color: #fac146;
    }
  }
  .section-category {
    width: 100px auto;
    margin-right: 8px;
    display: inline-block;
    .category__item {
      display: block;
      width: 100%;
      padding: .5rem;
      background-color: $gray-300;
      border-radius: .5rem;
      text-align: center;
      &:hover {
        background-color: #fac146;
      }
    }
  }
}
</style>