<template>
  <div>
    <router-link 
      class="container--exterrior"
      :to="{name: 'boardItem', params: { id: comment.comments_id, page: 0 }, }">
      <div class="cards">
        <!-- <img
          :src="comment.comments_image"
          :alt="comment.comments_id" /> -->
        <div class="cards__image">
          <el-avatar>
            {{ comment.comments_id }}
          </el-avatar>
        </div>
        <div class="cards__content">
          <div class="cards__user">
            <span class="cards__info">
              {{ translateId }}
            </span>
            <span 
              class="cards__date">
              {{ comment.comments_date }}
            </span>
            <span>
              주문 내역: {{ comment.food_items_food_id }}
            </span>
          </div>
          <span class="cards__text">
            {{ comment.comments_text }}
          </span>
        </div>
      </div>
    </router-link>
    <button 
      class="cards__btn"
      @click="likeBtn(this.comment.comments_id)">
      <i class="far fa-thumbs-up"></i>
      도움돼요 
    </button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  components: {
    // CommentDetailButton
  },
  props: {
    comment: {
      type: Object,
      default: function() { return {} },
      required: true,
    },
  },
   created() {
  console.log("created!");
  // const id = this.$route.params.id;
  const id = this.comment.comments_id;
  // console.log("id check", id);
  this.$store.commit('user/getLikeUserList', id);
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
      //  console.log(userId)
      if(typeof userId === 'string') {
        return userId.replace(/(?<=.).(?=.)/g, "*");
      }
      return null // return 값이 없으면 안됨
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
// @import '../../scss/variables.scss';

.cards {
  display: flex;
  padding: .5rem;
  // margin: 10px 20px;
  height: auto;
  background-color: #fff;
  border-radius: .5rem;
  box-shadow:  0px 2px 5px rgb(0,0,0, 0.1);
  transition: ease-out 300ms;
  transition-duration: 300ms;
}

.cards:active {
  background-color: #333;
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
    padding-bottom: 10px;
    color: #949393;
    font-size: 12px;
    font-weight: 600;  
  }
  .cards__date {
    margin-left: 5px;
  }
}
.cards__image {
  padding-top: 10px;
}
.cards__text {
  font-size: 14px;
  color: #333;
}

.cards__btn {
  padding: .3rem;
  margin-top: 10px;
  box-sizing: border-box;
  display: flex;
  outline: none;
  font-size: 16px;
  font-weight: bold;
  transition: .5s;
  border-radius: .5rem;
  border: 1px solid #eca115;
  background-color: #fff;
  color: #eca115;
}

</style>