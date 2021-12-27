<template>
    <div class="container"
      @click="addCart()">
      <div class="infos">
      <img
        :src="food.food_image1"
        :alt="food.food_name" />
        <div class="detail">
          <div class="name">
            <span>{{ food.food_name }}</span>
          </div>
          <div class="description">
          </div>
          <div class="price">
            <span class="price-num">{{ food.food_price }}</span>&nbsp;<span>원</span>
          </div>
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

.container {
  display: flex;
  width: 100%;
  height: 100px;
  padding: 5px;
  img {
    border-radius: 9px;
    height: 100px;
    width: 100px;
  }
  .infos {
    display: flex;
    margin-left: 5px;
    background-color: #ffffffa6;
    border-radius: 9px;
    height: 100px;
    width: 100%;
    font-weight: 800;
    color: $menuBg;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
    transition: ease-out 300ms;
    transition-duration: 300ms;
    .detail {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px;
      margin-left: 10px;
      height: 100%;
      width: 100%;
      .name {
        text-align: left;
        width: 100%;
        height: 30%;
      }
      .description {
        width: 100%;
        height: 24px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .price {
        display: flex;
        justify-content: flex-end;
        padding-top:5px;
        text-align: right;
        width: 100%;
        height: 30%;
      }
      .price-num {
        font-size: 1.1rem;
      }
    }
  }
  span {
    height: 100%;
  }
}
.infos:active {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>