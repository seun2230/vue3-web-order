<template>
  <div class="container">
    <div>
      <span>고객 총 평점</span>
      <span>{{ getRating }}</span>
    </div>
    <div>
      <progress 
        max="100"
        value="70"
        v-for="comment in comments"
        :key="comment.ratings"></progress>
    </div>
  </div>  
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('comment', ['comments']),
    getRating() {
      const comments = this.comments;
      const index = comments.map(comment => (comment.ratings));
      // return index;
      console.log("idnex",index);
      const plusRating = index.reduce((total, val) => total + val, 0); 
      const Rating = (plusRating / this.comments.length).toFixed(1);  
      return Rating;
    },
  },  
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  height: 150px;
  margin: auto;
  padding: 1rem 1rem;
  background-color: #ccc;
  border-radius: .2rem;
}
</style>
