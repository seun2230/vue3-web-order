<template>
  <div class="container">
    <div 
      class="section-content"
      v-for="foodItem in eachFood"
      :key="foodItem.food_id">
      <!-- <img 
        :src="foodItem.food_image1" 
        :alt="foodItem.food_image1" /> -->
      <img src="../../../../assets/Pizza.jpg" />
      <div class="content-box">
        <span class="name">{{ foodItem.food_name }}</span>
        <span>{{ foodItem.food_info }}</span>
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
          <span>리뷰 {{ reviewTotalCount }}개</span>
        </div>
        <div 
          v-else 
          class="section-no-rating">
        </div>
        <div class="section-price">
          <label>기본 가격</label>
          <div
            class="discount-price">
            {{ foodItem.food_price }}원
            <span class="list-price">
              {{ foodItem.food_price }}원
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {}
  },
  created() {
    const foodId = this.$route.params.id;
    console.log("foodId", foodId);
    this.$store.commit('food/getEachFood', foodId);
    this.$store.commit("comment/getState");
  },
  computed: {
    ...mapState('food', ['eachFood']),
    ...mapState('comment', ['comments']),
    ratingAverage() {
      const getfoodId = this.$route.params.id;
      console.log("getfoodId", getfoodId);
      const findRatings =  this.comments.filter(comment => comment.food_items_food_id == getfoodId).map(item => item.ratings);
      console.log("findRatings", findRatings);
      const addRating = findRatings.reduce((prev, current) => prev + current ,0);
      const result = (addRating / this.comments.length).toFixed(1);
      return result;
    },
    reviewTotalCount() {
      const getfoodId = this.$route.params.id;
      const findFoodId = this.comments.filter(comment => comment.food_items_food_id == getfoodId);
      console.log("s", findFoodId);
      return findFoodId.length;
    },
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/variables.scss';
@import '@/scss/common.scss';

.container {
  padding-top: 50px;

  .section-content {
    padding-top: 2px;
    display: flex;
    flex-direction: column;
    img {
      width: 400px auto;
      height: 300px;
      object-fit: cover;
    }
    .content-box {
      width: 100%;
      height: 100%;
      padding: 10px;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      border-bottom: 1px solid #ccc;

      span {
        padding-bottom: 8px;
        font-size: 1.2rem;
        color: $gray-800;
      }
      .name {
        font-size: 1.5rem;
        font-weight: bolder;
        color: black;
      }
      .section-price {
        display: flex;
        flex-direction: space-between;
        .discount-price {
          padding-top: 10px;
          padding-bottom: 8px;
          font-size: 1.3rem;
          font-weight: bolder;
          color: black;
          text-align: right;
          flex: 2;
          .list-price {
            font-size: 1.2rem;
            color: #e73251;
            text-decoration: line-through;
            text-decoration-color: #e73251;
          }
        }
      }
    }
  }
}
.section-rating {
  padding-bottom: 8px;
  .rating-text {
    margin-right: 5px;
    font-family: none;
    font-size: 16px;
    font-weight: bolder;
  }
}
</style>