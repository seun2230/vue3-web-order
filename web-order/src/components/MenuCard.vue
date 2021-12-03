<template>
  <div class="container">
    <div class="inner">
      <slot name="image">
        <img
          :src="food.food_image1"
          :alt="food.food_name" />
      </slot>
    </div>
    <div class="card-info">
      <div class="card-header">
        <slot name="title">
          {{ food.food_name }}
        </slot>
      </div>
      <div class="card-body">
        <slot name="subtitle">
          {{ food.food_price }}
        </slot>
      </div>
      <div class="card-footer">
        <slot name="button">
          <button @click="addCart()">
            ADD Cart
          </button>
        </slot>
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
.container:nth-child(1) {
  margin-top: 0px;
}
.container:nth-last-child(1) {
  margin-bottom: 0px;
}
.container {
  margin-top: 10px;
  padding: 2px;
  display: flex;
  border-radius: 7px;
  img {
  width: 150px;
  height: 100%; 
  border-radius: 3px;
  object-fit: cover;
  box-sizing: border-box;
  }
  .container:hover {
    img {
      opacity: 0.6;
    }
  }
  .card-info {
    display: grid
  }
}

</style>