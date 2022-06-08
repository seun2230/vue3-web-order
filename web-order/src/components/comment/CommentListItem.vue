<template>
  <router-link 
    class="container--exterrior"
    :to="{name: 'boardItem', params: { id: comment.comments_id }}">
    <div class="cards">
      <!-- <img
        :src="comment.comments_image"
        :alt="comment.comments_id" />
      {{ comment.food_price }} -->
      <div class="cards__content">
        <h3 class="cards__text">
          {{ comment.comments_text }}
        </h3>
        <div class="cards__user">
          <span class="cards__info">{{ translateId }}</span>
        </div>
        <!-- <div class="review-date">{{ comment.comments_date }}</div> -->
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
  },
  computed: {
    formmatDate() {
      const nowDate = this.comment.comments_date;
      const year = +nowDate.split('-')[0];
      const month = +nowDate.split('-')[1];
      const day = +nowDate.split('-')[2]
      const nowDateObject = new Date(year, month, day);

    return new Date().getTime() - nowDateObject.getTime() < 24 * 60 * 60 * 1000;

    },
    translateId() {
       const userId= this.comment.comments_user_id
       console.log(userId)
      if(typeof userId === 'string') {
        return userId.replace(/(?<=.).(?=.)/g, "*");
      }
      return null // return 값이 없으면 안됨
    }

  }
}
</script>

<style scoped lang="scss">
// @import '../../scss/variables.scss';

.cards {
  display: flex;
  margin: 5px 10px;
  border: 1px solid #f8f6f64d;
  box-shadow:  0px 2px 5px rgb(0,0,0, 0.1);
  border-radius: 10px;
  transition: ease-out 300ms;
  transition-duration: 300ms;
}

.cards:active {
  background-color: rgba(0, 0, 0, 0.1);
}

img {
  border-radius: .2rem;
  width: 150px;
  min-height: 140px;
  max-width: 32vw;
  min-width: 32vw;
  object-fit: cover;
  z-index: 0;
}

.cards__content {
  width: 100%;
  padding: 15px;

  .cards__user {
    color: rgb(99, 94, 94);
    font-weight: 600;
  }
  .review-date {
    margin-top: 30px;
    float: right;
    font-size: 15px;
    color: rgb(139, 137, 137);
  }
}

.cards__text {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 220px;
  font-weight: 500;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>