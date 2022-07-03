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
              <span 
                class="user__name">
                {{ translateId }}
              </span>
              <div class="user__info">
                <div 
                  class="inner__star"
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
            <div>
              <span class="cards__date">{{ formmatDate }}</span>
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
    <div 
      v-if="!likeBtn" 
      @click="likeButton()">
      <i class="far fa-thumbs-up"></i>
      도움됐어요
      <span>
        {{ likeUser.length }}  
      </span>
    </div>
    <div 
      v-else
      style="color: red"
      @click="dislikeButton()">
      <i class="far fa-thumbs-up"></i> 
      도움됐어요
      <span>
        {{ likeUser.length }}
      </span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapGetters } from 'vuex';
export default {
  props: {
    comment: {
      type: Object,
      default: function() { return {} },
      required: true,
    },
  },
  created() {
    const id = this.comment.comments_id;
    console.log("id", id);
    this.$store.commit('user/getLikeUserList', id);
  },
  computed: { 
    ...mapState('user', ['likeUser']),
    ...mapGetters('user', ['likeBtn']),
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
  methods: {
    likeButton() {
      let id = this.comment.comments_id;
      console.log("commentListItem id", id);

      axios.post(`${process.env.VUE_APP_URL}/api/user/post/likeUp/` + id)
      .then(res => {
        console.log("likeBtn response success", res.data);
      })
      .catch(err => {
        console.log("likeBtn response fail", err.response);
      })
    },
  },
  disLikeButton() {
    const id = this.comment.comments_id;
    axios.post(`${process.env.VUE_APP_URL}/api/user/post/likeDown/` + id)
    .then(res => {
      console.log("dislikeBtn response success", res.data);
        this.$router.go();
    })
    .catch(err => {
      console.log("dislikeBtn response fail", err.response);
    })
  },
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
      width: 100%;
      line-height: 20px;
      .user {
        flex: 2;
        color: #949393;
        height: 100%;
        display: flex;
        flex-direction: column;
        font-size: 14px;
        font-weight: bold;
        margin-left: 10px;
        .user__name {
          display: block;
          width: 150px;
          color: $gray-text;
        }
        .user__info {
          display: flex;
          width: 100%;
          flex-direction: row;
          font-size: 15px;
        }
      }
    }
  }
  .cards__text {
    margin: 15px 0px;
    display: block;
    font-size: 16px;
    font-weight: 500;
    color: $gray-text;
  }
}

.cards__date {
  width: 50%;
  margin-left: 0 auto;
  text-align: right;
  color: $gray-600;
  line-height: 30px;
}
.cards:active {
  background-color: $gray-text;
}
.inner__star {
  width: 15px;
  height: 2px;
}
img {
  border-radius: .2rem;
  height: 100px;
  width: 100px;
  object-fit: cover;
  z-index: 1;
}
</style>