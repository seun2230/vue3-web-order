<template>
  <div class="container">
    <router-link 
      class="container--exterrior"
      :to="{name: 'boardItem', params: { id: comment.comments_id, page: 0 }, }">
      <div class="cards">
        <el-avatar>
          {{ comment.comments_id }}
        </el-avatar>
        <div 
          class="cards__user">
          {{ translateId }}
          <div class="user__info">
            <div 
              class="info__star"
              v-for="item in 5"
              :key="item">
              <div 
                class="star-background-sm"
                :class="{'star-forward-sm': item <= comment.ratings }">
                ☆
              </div>
            </div>
          </div>
        </div>
        <span class="cards__date">{{ formmatDate }}</span>
      </div>
      <span class="cards__text">
        {{ comment.comments_text }}
      </span> 
      <img src="../../assets/Pizza.jpg" />
      <!-- <img
        :src="comment.comments_image"
        :alt="comment.comments_id" />  -->
    </router-link>
    <CommentListItemButton
      :comment="comment" />
  </div>
</template>

<script>
import CommentListItemButton from './CommentListItemButton.vue';
export default {
  components: {
    CommentListItemButton
  },
  props: {
    comment: {
      type: Object,
      default: function() { return {} },
      required: true,
    },
  },
  computed: { 
    formmatDate() {
      const nowDate = this.comment.comments_date;
      const formmatDate = nowDate.replace(/(\d{4}).(\d{2}).(\d{2})/,'$1.$2.$3');
      return formmatDate;
    },
    translateId() {
       const userId= this.comment.comments_user_id;
      if(typeof userId === 'string') {
        return userId.replace(/(?<=.).(?=.)/g, "*");
      }
      return null
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/scss/btn.scss';
@import '@/scss/common.scss';
.container {
  padding: 10px;
  border-bottom: 1px solid $gray-400;
}
.cards {
  display: flex;
  flex-direction: row;
  width: 100%;
  line-height: 20px;
  .cards__user {
    color: #949393;
    flex: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    font-weight: bold;
    margin-left: 10px;
    .user__info {
      display: flex;
      width: 100%;
      flex-direction: row;
      font-size: 15px;
      .info__star {
        width: 15px;
        height: 2px;
      }
    }
  }
  .cards__date {
    width: 50%;
    margin-left: 0 auto;
    text-align: right;
    font-weight: bold;
    color: $gray-600;
    line-height: 30px;
  }
}
.cards__text {
  margin: 15px 0px;
  display: block;
  font-size: 16px;
  font-weight: 500;
  color: $gray-text;
}

img {
  border-radius: .2rem;
  height: 100px;
  width: 100px;
  object-fit: cover;
  z-index: 1;
}
</style>