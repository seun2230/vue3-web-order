<template>
  <div class="conainer">
    <div class="inner">
      <span>💙고객님의 평점을 선택해주세요💙</span>
      <div class="inner__item">
      </div>
      <div class="rating">
        <div 
          class="rating-item"
          v-for="rating in ratings"
          :key="rating.id"
          :v-model="rating.id"
          @click="checkRating(rating.id)">
          {{ rating.id }}
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ratings: [{id: 1 }, {id: 2}, {id: 3}, {id: 4}, {id: 5}],
      selectRating: [],
      parentRating: this.childRating
    }
  },
  methods: {
    checkRating(rating_id) {
      console.log("click ratings", rating_id);
      // eslint-disable-next-line vue/require-explicit-emits
      this.$emit('child', rating_id);
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 30px;
  padding: 1rem 1rem;
  .inner {
    margin-top: 30px;
    color: #333;
    font-size: 16px;
    font-weight: bold;

    .inner__item {
      margin-top: 30px;
      font-size: 18px;
    }
  }
  .rating {
    display: flex;
    flex-direction: row;
    .rating-item {
      margin: 5px;
      width: 50px;
      height: 50px;
      border: 6px solid  #409EFF;
      box-shadow: 2px 4px 4px #0000001a;
      border-radius: 50%;
      align-items: center;
    } 
  }
}
</style>