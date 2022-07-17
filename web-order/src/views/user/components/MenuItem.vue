<template>
  <div class="container">
    <div 
      class="infos"
      @click="addCart()">
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
            <span>{{ "(" +reviewTotalCount + ")" }}</span>
          </div>
          <div 
            v-else 
            class="section-no-rating"></div>
        </div>
        <div
          class="price">
          {{ translatePrice }}
          <span class="price-num">
            {{ translatePrice }}원
          </span>
        </div>
        <div>
          <span
            class="icon-cart" 
            @click="addToLike()">
            <i class="far fa-bookmark"></i>
          </span>
        </div>
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
    this.$store.commit("comment/getState");
  },
  methods: {
    addCart() {
      this.$store.dispatch('food/addCart', this.food);
    }
  },
  computed: {
    ...mapState('comment', ['comments']),
    ratingAverage() {
      const foodId = this.food.food_id;
      const findRatings =  this.comments.filter(comment => comment.food_items_food_id === foodId).map(item => item.ratings);
      const addRating = findRatings.reduce((prev, current) => prev + current ,0);
      const result = (addRating/ this.comments.length).toFixed(1);
      return result;
    },
    reviewTotalCount() {
      const foodId = this.food.food_id;
      const findFoodId = this.comments.filter(comment => comment.food_items_food_id === foodId);
      return findFoodId.length;
    },
    translatePrice() {
      const totalPrice = this.food.food_price;
      return totalPrice.toString().replace(/\B(?=(\d{3}))/g, ',');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/variables.scss';
.container {
  width: 100%;
  height: 100%;
  .infos {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    font-weight: 800;
    img {
      display: block;
      border-radius: .2rem;
      margin-left: 5px;
      width: 192px;
      height: 180px;
    }
    .detail {
      margin-top: 10px;
      padding-left: 15px;
      .name {
        margin-top: 5px;
        font-size: 1.1rem;
        color: $gray-color-100;
      }
      .section-rating {
        margin-top: 5px;
      }
      .section-no-rating {
        margin-top: 10px;
        height: 10px;
      }
      .price {
        margin-top: 10px;  
        .price-num {
          font-size: 1.2rem;
          color: #e73251;
          text-decoration: line-through;
          text-decoration-color: #e73251;
        }
      }
    }
  }
  .infos:active {
    width: 195px;
    height: 300px;
    border-radius: .2rem;
    background-color:#f7b423;
  }
  .icon-cart {
    color: $gray-500;
    bottom: 5px;
    flex: 1;
    padding-right: 15px;
    &:active {
      color: #f7b423;    
    }
  }
}
</style>