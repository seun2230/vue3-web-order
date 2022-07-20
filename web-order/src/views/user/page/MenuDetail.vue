<template>
  <div class="container">
    <div 
      v-for="foodItem in eachFood"
      :key="foodItem.food_id">
      {{ foodItem.food_image1 }}
      {{ foodItem.food_name }}
      {{ foodItem.food_price }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  created() {
    const foodId = this.$route.params.id;
    console.log("foodId", foodId);
    this.$store.commit('food/getEachFood', foodId);
  },
  computed: {
    ...mapState('food', ['eachFood'])
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 0 auto;
  padding: 20px;
  background: #fff;
}
</style>