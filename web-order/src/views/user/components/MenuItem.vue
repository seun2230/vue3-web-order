<template>
  <div 
    class="container"
    @click="addCart()">
    <div class="infos">
      <!-- <img
        :src="food.food_image1"
        :alt="food.food_name" /> -->
      <img src="../../../assets/cook.jpg" />
      <div class="detail">
        <div class="name">
          <span>{{ food.food_name }}</span>
          <div 
            class="section-rating"
            v-if="ratingAverage > 1">
            <span 
              class="star-background-sm"
              :class="{'star-forward-sm': ratingAverage }">
              ☆ 
            </span>
            <span class="rating-text">
              {{ ratingAverage }}
            </span>
          </div>
        </div>
        <div class="price">
          <span class="price-num">
            {{ food.food_price }}원
          </span>
        </div>
      </div>
      <div
        class="icon-cart" 
        @click="addToCart()">
        <i class="fas fa-shopping-cart"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  props: {
    food: {
      type: Object,
      default: function() { return {} }
    }
  },
  created() {
    this.$store.commit("comment/getState")
  },
  methods: {
    addCart() {
      this.$store.dispatch('food/addCart', this.food)
    }
  },
  computed: {
    ...mapState('comment', ['comments']),
    ratingAverage() {
      const foodId = this.food.food_id;
      const findRatings =  this.comments.filter(comment => comment.food_items_food_id === foodId).map(item => item.ratings);
      const addRating = findRatings.reduce((prev, current) => prev + current ,0);
      console.log("addRating", addRating);
      console.log("findRatings", findRatings);

      const result = (addRating/ this.comments.length).toFixed(1);
      console.log("result", result);
      return result;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/variables.scss';
.container {
  width: 100%;
  margin-right: 5px;
  border: 1px solid $gray-400;
  padding: .2rem;
  img {
    display: block;
    margin: 5px auto;
    border-radius: .2rem;
    height: 150px;
    width: 170px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.233);
  }
  .infos {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    text-align: center;
    font-weight: 800;
    .detail {
      margin-top: 10px;
      .name {
        font-size: 1.1rem;
        color: $gray-text;
      }
      .section-rating {
        margin-top: 5px;
      }
      .price {
        margin-top: 10px;
        .price-num {
          font-size: 1.2rem;
          color: $pink;
        }
      }
    }
  }
  .icon-cart {
    color: $gray-500;
    text-align: left;
    bottom: 10px;
  }
}
.infos:active {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>