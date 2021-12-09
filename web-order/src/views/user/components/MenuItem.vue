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
        <span>{{ food.food_price }}</span>
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
    text-align: center;
    width: 100%;
    font-weight: 800;
    color: #ff7b7b9a;
    .name {
      display: flex;
      justify-items: center;
      width: 100%;
      height: 25px;
      background-color: $menuListInf1;
      margin-bottom: 3px;
      border-radius: 9px;
    }
    .price {
      display: flex;
      justify-content: center;
      height: 25px;
      border-radius: 9px;
      background-color: $menuListInf2;
      margin-bottom: 3px;
    }
    .button {
      display: flex;
      height: 25px;
      background-color: $menuListInf1;
      border-radius: 9px;
      color: #ff7b7b9a;
    }
    span {
      width: 100%;
    }
  }
}

// .btn-primary {
//   padding: 0;
//   margin: 0;
// }
// .image {
//   $width: 200px;
//   width: $width;
//   height: $width;
//   margin: 10px;
//   border-radius: 4px;
//   background-size: cover;
//   overflow: hidden;
//   position: relative;
//   &:hover::after {
//     content: "";
//     position: absolute;
//     top: 0;
//     bottom: 0;
//     left: 0;
//     right: 0;
//   }
//   .infos {
//     width: 100%;
//     padding: 14px;
//     font-size: 14px;
//     text-align: center;
//     position: absolute;
//     left: 0;
//     bottom: 0;
//     backdrop-filter: blur(10px);
//     .price {
//     }
//     .name {
//       white-space: nowrap;
//       overflow: hidden;
//       text-overflow: ellipsis;
//     }
//     .info {
//     }
//   }
// }
</style>