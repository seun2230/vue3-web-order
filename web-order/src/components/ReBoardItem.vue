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
      <span class="badge-new">
      new
      </span>
      <div class="card-content">
        <div class="card-user">
          <span class="user-info">{{ comment.comments_user_id }}</span> 
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
        <h3>{{ comment.comments_title }}</h3>
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
  }
}
</script>

<style scoped lang="scss">
@import '../scss/variables.scss';
.cards {
  display: flex;
  border: 2px solid rgb(233, 240, 247);
  width: 100%;
  height: 200px;
}

.badge-new {
  position: absolute;
  right: 5px;
  background: orange;
  color: #fff;
  border-radius: 2px solid;
  text-transform: uppercase;
  font-weight: bold;
  font-style: oblique;
// box-shadow: 0px 1px 3px 2px #ebebeb inset;
}
.card-image {
  img {
  border-radius: .2rem;
  width: 200px;
  min-height: 200px;
  }
}
.card-content {
  width: 320px;
  min-height: 200px;
  padding: 15px;
  // text-align: center;

  .user-info {
    color: rgb(99, 94, 94);
    font-weight: 600;
  }
  .review-date {
    padding-top: 30px;
    float: right;
    top: -20px;
    bottom: 10px;
    color: rgb(139, 137, 137);
    position: fixed;
  }
}
.text {
  display: -webkit-box;
  word-wrap: break-word;
  -webkit-line-clamp: 3;
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