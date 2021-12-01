<template>
  <button
    class="btn btn-primary"
    @click="addCart()">
    <div class="image">
      <img 
        :src="`${food.food_image1}`" 
        :alt="`${food.food_name}`" />
      <div class="infos">
        <div class="name">
          {{ food.food_name }}
        </div>
        <div class="price">
          {{ food.food_price }}
        </div>
      </div>
    </div>
  </button>
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
@import '../scss/main.scss';
.btn-primary {
  padding: 0;
  margin: 0;
}
.image {
  $width: 200px;
  width: $width;
  height: $width;
  margin: 10px;
  border-radius: 4px;
  background-color: $gray-400;
  background-size: cover;
  overflow: hidden;
  position: relative;
  &:hover::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 6px solid $primary;
  }
  .infos {
    background-color: rgba($black, .3);
    width: 100%;
    padding: 14px;
    font-size: 14px;
    text-align: center;
    position: absolute;
    left: 0;
    bottom: 0;
    backdrop-filter: blur(10px);
    .price {
      color: $primary;
    }
    .name {
      color: $white;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .info {
      color: $primary;
    }
  }
}
</style>