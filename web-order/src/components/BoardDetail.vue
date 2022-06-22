<template>
  <div class="container">
    <div class="inner">
      <div class="inner__left">
        <el-avatar>{{ myComment.comments_user_id }}</el-avatar>
        <div class="inner__item">
          <span>{{ myComment.comments_user_id }}</span>
          <span>{{ myComment.comments_date }}</span>
        </div>
      </div>
      <CommentNullImage
        :my-comment="this.myComment" />
      <div class="text">
        <p>{{ myComment.comments_text }}</p>
      </div>
      <CommentDetailButton
        :my-comment="this.myComment" />
      <div 
        class="reply-content"
        v-if="!show">
        <input 
          id="textId"
          type="text" 
          class="reply-input" 
          v-model="textarea" 
          placeholder="댓글을 입력하세요." />
        <button
          class="reply-btn"
          :disabled="textarea.length < 1 ? true : false"
          @click.self.prevent="writeReply()">
          등록
        </button>
      </div>
      <ReplyList
        v-for="reply in replys"
        :reply="reply"
        :key="reply.id_reply"
        :my-comment="this.myComment" />
    </div>
  </div>
</template>

<script>
import CommentDetailButton from './comment/CommentDetailButton.vue'
import CommentNullImage from './comment/CommentNullImage.vue';
import ReplyList from './ReplyList.vue';
import { mapState } from 'vuex';

export default {
  components: {
    CommentDetailButton,
    CommentNullImage,
    ReplyList
  },
  props: {
  },
  data() {
    return {
      deleteMessage: "",
      show: '',
      textarea: ''
    }
  },
  created() {
    const id = this.$route.params.id;
    // const id = this.params.id;
    console.log("id", id);
    this.$store.commit('comment/getComment', id);
    this.$store.commit('comment/getReply', id);
  },
  computed: {
    ...mapState('comment', ['myComment']),
    ...mapState('comment', ['replys']),
  },
  methods: {
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

<style scoped lang="scss">
.inner {
  padding: 20px;
  height: auto;
}
.inner__left {
  display: flex;
  margin-bottom: 10px;
  .inner__item {
    margin-left: 10px;
    height: auto;
    
    span {
      display: block;
      color: #333;
    }
  }
}

.reply-content {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 20px;
}

.reply-input { 
  border: 1px solid #ccc;
  border-radius: .5rem;
  padding: 10px;
  width: 100%;
  height: 50px;
}

.reply-btn {
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