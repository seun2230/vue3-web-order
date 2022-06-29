<template>
  <div class="container">
    <div class="progress-inner">
      <span>{{ getTotalRating }}</span>
      <div class="progress-content">
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
            {{ (( item / comments.length ) * 100).toFixed(0)+ '%' }}
          </label>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('comment', ['comments']),
    
    // 고객 총 평점 
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
      }).filter(ratings => ratings);   // undefind 제거 완료 : [3, 5, 3, 4, 3]
    
      const rating = calcRating.reduce((prev, curr) => {
        // console.log(prev[curr] ? prev[curr] + 1 : prev); // 중복값 3만 찾아옴
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
  max-width: 500px;
  height: 200px;
  margin: auto;
  padding: 1rem 1rem;
  background-color: #fff;
  border-radius: .2rem;
  box-shadow: 2px 1px 4px rgba(0, 0, 0, 0.26);

  .progress-inner {
    // background-color: purple;
    padding-top: 10px;
    min-width: 150px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: flex-end;
    span {
      padding: 30px;
      display: block;
      font-size: 18px;
      font-weight: bold;
      align-items: center;
    }
  }
}

label {
  appearance: none;
  font-size: 14px;
  font-weight: none;
  color: #ccc;
  padding: 8px;
}

</style>