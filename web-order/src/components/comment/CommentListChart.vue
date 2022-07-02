<template>
  <div class="container">
    <div class="container__inner">
      <div 
        class="inner__star"
        v-for="item in 5"
        :key="item">
        <span 
          class="star-background-md"
          :class="{'star-forward-md': item <= getTotalRating }">
          ☆
        </span>
      </div>
      <div class="inner__total">
        총 평점<span class="total">{{ getTotalRating }}</span>
      </div>
      <div class="inner__progress">
        <div 
          class="progress-item"
          v-for="(item, index) in getRatingPercent"
          :key="item">
          {{ index }} 점 
          <progress
            max="100"
            :value="item">
          </progress>
          <label :for="item">
            {{ (( item / comments.length ) * 100).toFixed(0) + '%' }}
          </label>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      flag: true
    }
  },
  computed: {
    ...mapState('comment', ['comments']),
    getTotalRating() {
      let index = this.comments.map(comment => comment.ratings);
      let plusRating = index.reduce((total, val) => total + val, 0); 
      const Rating = (plusRating / this.comments.length).toFixed(1);  
      return Rating;
    },
    getRatingPercent() {
      const comments = this.comments;
      let calcRating = comments.map(function(item) {
        if(item.ratings !== null) {
          let rating = item.ratings;
          return rating;
        }
      }).filter(ratings => ratings);  
    
      const rating = calcRating.reduce((prev, curr) => {
        prev[curr] = (prev[curr] || 0) + 1;
        return prev;
      }, {});
      return rating;
    },
  },  
}
</script>

<style lang="scss" scoped>
@import '@/scss/btn.scss';
@import '@/scss/common.scss';
.container {
  max-width: auto;
  height: 150px;
  margin: auto;
  padding: 1.5rem;
  background-color: #fff;
  border-bottom: 1px solid #ccc;

  .container__inner {
    height: 100%;
    padding: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: flex-end;

    .inner__total {
      margin-top: 30px;
      display: block;
      position: absolute;
      top: 50px;
      left: 30px;
      .total {
        padding-left: 5px;
        font-weight: bold;
        color: #ffae00;
        text-align: center;
      }
    }
    .inner__progress {
      margin-left: 10px;
    }
  }
}

label {
  appearance: none;
  font-size: 14px;
  font-weight: none;
  color: #aca7a7;
  margin-left: 2px;
}

.inner__star {
  width: 15px;
  height: 20px;
  margin-right: 5px;
  margin-top: 12px;
  align-items: center;
  line-height: 50px;
}
</style>