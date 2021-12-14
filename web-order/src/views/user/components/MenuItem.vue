<template>
  <div class="container">
    <img
      :src="food.food_image1" 
      :alt="food.food_name" />
    <div class="infos">
      <div class="name">
        <span>{{ food.food_name }}</span>
      </div>
      <div class="price">
        <span>{{ food.food_price }} 원</span>
      </div>
      <div class="button">
        <el-button
          type="text"
          class="menu-btn"
          @click="addCart()">
          <span>추가하기</span>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  props: {
    food: {
      type: Object,
      default: function() { return {} }
    }
  },
  methods: {
    addCart() {
      this.$store.dispatch('food/addCart', this.food)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../scss/variables.scss';
@import '../../../scss/btn.scss';

.container {
  padding: 10px;
  display: flex;
  width:100%;
  height:120px;
  background-color: $menuListBg;
  img {
    border-radius: 9px;
    height: 100px;
    width: 100px;
  }
  .infos {
    margin-left: 5px;
    padding: 10px;
    border-radius: 9px;
    background-color: $menuListCnt;
    border-radius: 9px;
    width: 100%;
    text-align: center;
    font-weight: 800;
    color: $menuBg;
    .name {
      display: flex;
      justify-items: center;
      width: 100%;
      height: 25px;
      margin-bottom: 3px;
      border-radius: 9px;
    }
    .price {
      display: flex;
      justify-content: center;
      height: 25px;
      border-radius: 9px;
      margin-bottom: 3px;
    }
    .button {
      display: flex;
      height: 25px;
      border-radius: 9px;
      color: #ff7b7b9a;
    }
    span {
      width: 100%;
    }
  }
}
</style>