<template>
  <router-link class="container-exterrior"
    :to="{name: 'boardItem', params: { id: comment.comments_id }}">
    <div class="cards">
      <div class="card-image">
        <img 
          :src="comment.comments_image"
          :alt="comment.comments_id" />
        {{ comment.food_price }}
      </div>
      <div class="card-content">
         <h3>{{ comment.comments_title }}</h3>
          <span class="text">{{ comment.comments_text }}</span>

          <div class="card-user">
            <span class="user-id">{{ comment.comments_user_id }}</span> 
            <span>{{ comment.comments_date }}</span>
          </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      default: function() { return {} },
      required: true,
    },
  },
  methods: {
    ratingToPercent() {
      const score = this.comment.ratings;
      console.log(score);
      return score * 20;
    },
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
@import '../scss/variables.scss';

img {
  border-radius: 5px;
  width: 20vh;
  height: 20vh;
}

.cards {
  display: flex;
  border: 2px solid rgb(233, 240, 247);
}
.card-content {
  width: 320px;
  min-height: auto;
  padding: 15px;
  text-align: center;

  .user-id {
    color: lightgray;
    font-weight: 600;
  }
}

.text {
  display: -webkit-box;
  word-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  // text가 많은 경우 생략 기호 보여주기
  overflow: hidden;
  text-overflow: ellipsis;
}


</style>