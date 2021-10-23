<template>
    <div class="image">
        <img :src="`${food.image}`" :alt="`${food.name}`" />
        <div class="info">
            <div class="name">{{ food.name }}</div>
            <div class="price">{{ food.price }}</div>
            <div class="info">{{ food.info }}</div>
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
    }
}
</script>

<style lang="scss" scoped>
@import '../scss/main.scss';

.image {
  $width: 200px;
  width: $width;
  height: $width * 3 / 2;
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
  .info {
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