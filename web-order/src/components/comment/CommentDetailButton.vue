<template>
  <div class="btn-container">
    <div class="btn">
      <div 
        v-if="!likeBtn" 
        @click="likeButton()">
        <i class="far fa-thumbs-up"></i>
        <span class="btn__text">
          {{ likeUser.length }}  
          추천해요
        </span>
      </div>
      <div 
        v-else 
        :class="{'btn-dislike': isActive}"
        @click="dislikeButton()">
        <i class="far fa-thumbs-up"></i> 
        <span>
          {{ likeUser.length }}
          명에게 도움이 됐어요
        </span>       
      </div>
    </div>
    <div
      class="btn"
      @click="showReply()">
      <i class="far fa-comment-dots"></i>
      {{ replys.length }}
    </div>
    <div 
      class="form_group"
      v-if="show">
      <input 
        id="textId"
        type="text" 
        class="input-reply" 
        v-model="textarea" 
        placeholder="댓글을 입력하세요." />
      <button
        class="btn-reply"
        :disabled="textarea.length < 1 ? true : false"
        @click.self.prevent="writeReply()">
        등록
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapGetters } from 'vuex';

export default {
  props: {
    myComment: {
      type: Object,
      default: function() { return {} },
      required: true,
    },
  },
  data() {
    return {
      show: '',
      textarea: '',
      isActive: true,
      modal: true
    }
  },
  created() {
    const id = this.$route.params.id;
    this.$store.commit('user/getLikeUserList', id);
  },
  computed: {
    ...mapState('user', ['likeUser']),   
    ...mapState('comment', ['replys']),
    ...mapGetters('user', ['likeBtn']),
  },
  methods: {
    likeButton() {
      const id = this.$route.params.id;
      axios.post(`${process.env.VUE_APP_URL}/api/user/post/likeUp/` + id)
      .then(res => {
        console.log("server response", res.data);
        this.$router.go();
      })
      .catch(err => {
        console.log("err", err);
      })
    },
    dislikeButton() {
      console.log("clicked!")
      const id = this.$route.params.id;
      axios.post(`${process.env.VUE_APP_URL}/api/user/post/likeDown/` + id)
      .then(res => {
        console.log("server response", res.data);
         this.$router.go();
      })
      .catch(err => {
        console.log("err", err);
      })
    },
    showReply() {
      this.show = true;
    },
    writeReply() {
      const id = this.$route.params.id;
      const foodId =  this.myComment.food_id;
      const text = this.textarea;

      let data = [{ "food_id": foodId,
        "comment_text": text,
        "comment_id": id }];

      this.$store.dispatch('comment/writeReply', data);
      this.textarea='';
    },
  }
}
</script>

<style scoped>
svg {
  color: #ccc;
}

.btn-container {
  display: inline-flex;
}
.btn {
  margin-right: 20px;
  color: #ccc;
  transition-duration: .3s;
}
.btn__text {
  margin: 5px;
}

.btn-dislike {
  color: #f33c5a;
}
.form_group {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 10px;
  position: fixed;
  left: 0;
  bottom: 90px;
}

.input-reply { 
  border: 1px solid #ccc;
  border-radius: .5rem;
  padding: 10px;
  width: 100%;
  height: 50px;
}

.btn-reply {
  padding: .2rem;
  width: 20%;
  box-sizing: border-box;
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