<template>
  <router-link class="container-exterrior"
    :to="{name: 'boardItem', params: { id: comment.comments_id }}">
    <div class="cards">
      <img
        :src="comment.comments_image"
        :alt="comment.comments_id" />
      {{ comment.food_price }}
      <span v-if="formmatDate" class="badge-new">
      new
      </span>
      <div class="card-content">
        <div class="card-user">
          <span class="user-info">{{ translateId }}</span>
        </div>
        <div class="ratings">
          <div
            class="ratings-fill"
            :style="{ width: comment.ratings * 20 + '%' }">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
          <div class="ratings-before">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
        </div>
        <h3 class="title">{{ comment.comments_title }}</h3>
        <span class="text">{{ comment.comments_text }}</span>
        <div class="review-date">{{ comment.comments_date }}</div>
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
    // 하루 기준 시간 지나면 new badge가 없어짐
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
@import '../scss/variables.scss';
.cards {
  display: flex;
  border: 3px solid rgb(233, 240, 247);
  width: 100%;
  height: 150px;
  transition: ease-out 300ms;
  transition-duration: 300ms;
}

.cards:active {
  background-color: rgba(0, 0, 0, 0.1);
}

.badge-new {
  position: absolute;
  background: orange;
  width: 40px;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-style: oblique;
}
img {
  border-radius: .2rem;
  width: 150px;
  min-height: 140px;
  object-fit: cover;
  z-index: 0;
}
.card-content {
  width: 320px;
  padding: 15px;
  // text-align: center;

  .user-info {
    color: rgb(99, 94, 94);
    font-weight: 600;
  }
  .review-date {
    right: 220px;
    font-size: 15px;
    color: rgb(139, 137, 137);
  }
}
.title {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 210px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.text {
  display: -webkit-box;
  word-wrap: break-word;
  margin-bottom: 10px;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  // text가 많은 경우 생략 기호 보여주기
  overflow: hidden;
  text-overflow: ellipsis;
}

.ratings {
  display: inline-block;
  position: relative;
  unicode-bidi: bidi-override;
  width: max-content;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 1.3px;
  -webkit-text-stroke-color: rgba(255, 255, 255, 0.322);
}

.ratings-fill {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  overflow: hidden;
  -webkit-text-fill-color: rgba(245, 148, 22, 0.842);
}

</style>