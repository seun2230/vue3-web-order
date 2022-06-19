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
      <ReplyList
        v-for="reply in replys"
        :reply="reply"
        :key="reply.id_reply" />
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
</style>