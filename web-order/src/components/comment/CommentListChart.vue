<template>
  <div class="container">
    <div class="progressbar-inner">
      <span>고객 총 평점</span>
      <span>{{ getTotalRating }}</span>
    </div>
    <div 
      v-for="item in getRatingPercent"
      :key="item">
      <progress
        max="100"
        :value="item">
      </progress>
      <label>{{ item + '%' }}</label>
    </div>
  </div>  
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      name: ['1', '2', '3', '4', '5']
    }
  },
  computed: {
    ...mapState('comment', ['comments']),
    
    // 고객 총 평점 
    getTotalRating() {
      let index = this.comments.map(comment => comment.ratings);
      let plusRating = index.reduce((total, val) => total + val, 0); 
      const Rating = (plusRating / this.comments.length).toFixed(1);  
      return Rating;
    },

    // 각각의 rating의 백분율 구하기  
    getRatingPercent() {
      const comments = this.comments;
      let calcRating = this.comments.map(function(item) {
        let ratings = item.ratings;
        // console.log("data", rating);
        let filterRating = comments.filter(comment => comment.ratings === ratings).length;
        console.log("filterRating", filterRating);  // 3
        let resultRating = ((filterRating / comments.length) * 100).toFixed(0);
        console.log("a", resultRating);

        return resultRating;
      })
      console.log(calcRating);
      return calcRating;
    },
  },  
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  height: 200px;
  margin: auto;
  padding: 1rem 1rem;
  background-color: #fff;
  border-radius: .2rem;
  box-shadow: 2px 1px 4px rgba(0, 0, 0, 0.26);
}
</style>