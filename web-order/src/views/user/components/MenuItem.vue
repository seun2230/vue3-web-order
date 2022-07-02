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
            v-if="ratingAverage > 1"
            class="rating-section">
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
      flex-direction: row;
      justify-content: space-between;
      padding: 15px;
      margin-left: 5px;
      height: 100%;
      width: 100%;
      .name {
        text-align: left;
        width: 60%;
        height: 30%;    
      }
      .description {
        width: 100%;
        height: 24px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .rating-section {
        display: flex;
        flex-direction: row;
        width: 80px;
    
      }
      .rating-text {
        display: block;
        color: $gray-text;
        margin-left: 5px;
        font-size: .9rem;
      }
      .price {
        width: 40%;
        height: 100%;
        padding-top:5px;
        text-align: right;
        .price-num {
          display: block;
          font-size: 1.1rem;
          bottom: 0;
        }
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