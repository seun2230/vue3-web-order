<template>
  <div>
    <router-link 
      class="container--exterrior"
      :to="{name: 'boardItem', params: { id: comment.comments_id, page: 0 }, }">
      <div class="cards">
        <div class="cards__inner">
          <div class="inner__user">
            <el-avatar>
              {{ comment.comments_id }}
            </el-avatar>
            <div class="user">
              <span class="user__name">
                {{ translateId }}
              </span>
              <div class="user__info">
                <div 
                  class="inner__star"
                  v-for="item in 5"
                  :key="item">
                  <div 
                    class="star-background-small"
                    :class="{'star-content-small': item <= comment.ratings }">
                    ☆
                  </div>
                </div>
                <span :style="{ 'margin-right': '10px'}">{{ comment.comments_date }}</span>
              </div>
            </div>
          </div>
          <span class="cards__text">
            {{ comment.comments_text }}
          </span> 
          <div>
            <img
              :src="comment.comments_image"
              :alt="comment.comments_id" /> 
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import axios from 'axios';
export default {
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
      const year = +nowDate.split('-')[0];
      const month = +nowDate.split('-')[1];
      const day = +nowDate.split('-')[2]
      const nowDateObject = new Date(year, month, day);

      return new Date().getTime() - nowDateObject.getTime() < 24 * 60 * 60 * 1000;
    },
    translateId() {
       const userId= this.comment.comments_user_id;
      if(typeof userId === 'string') {
        return userId.replace(/(?<=.).(?=.)/g, "*");
      }
      return null
    },
  },
  methods: {
    likeBtn(id) {
      console.log("id check", id);
      axios.post(`${process.env.VUE_APP_URL}/api/user/post/likeUp/` + id)
      .then(res => {
        console.log("server response", res.data);
      })
      .catch(err => {
        console.log("err", err);
      })
    },
  }
}
</script>

<style scoped lang="scss">
@import '@/scss/btn.scss';
@import '@/scss/common.scss';

.cards {
  display: flex;
  padding: .2rem;
  height: auto;
  background-color: #fff;
  transition: ease-out 300ms;
  transition-duration: 300ms;

  .cards__inner {
    width: 100%;
    margin-left: 10px;
    margin-right: 10px;
    padding: 1rem;
    box-shadow: 2px 2px 4px #0000001a;
    border-radius: .5rem;

    .inner__user {
      display: flex;
      flex-direction: row;
      width: auto;
      line-height: 12px;
      .user {
        color: #949393;
        display: flex;
        flex-direction: column;
        font-size: 14px;
        font-weight: 600;  
        margin-left: 5px;
      }
    }
  }
  .cards__text {
    margin: 15px 0px;
    display: block;
    font-size: 16px;
    font-weight: 400;
    color: #333;
  }
}

.cards:active {
  background-color: #333;
}
.user__name {
  margin-bottom: 5px;
  display: block;
  color:#333;
}
.user__info {
  display: flex;
  flex-direction: row;
  font-size: 16px;
}
.inner__star {
  width: 18px;
  height: 10px;
}

img {
  border-radius: .2rem;
  height: 100px;
  width: 100px;
  object-fit: cover;
  z-index: 1;
}
</style>