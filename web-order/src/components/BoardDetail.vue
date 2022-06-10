<template>
  <div class="container">
    <div class="inner">
      <div class="inner__left">
        <el-avatar>{{ myComment.comments_user_id }}</el-avatar>
        <div class="inner__item">
          <span>{{ myComment.comments_user_id }}</span>
          <span>5일전</span>
        </div>
      </div>
      <CommentNullImage
        :my-comment="this.myComment" />
      <div class="text">
        <p>{{ myComment.comments_text }}</p>
      </div>
      <CommentDetailButton />
    </div>
  </div>
</template>

<script>
import CommentDetailButton from './comment/CommentDetailButton.vue'
import CommentNullImage from './comment/CommentNullImage.vue';
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  components: {
    CommentDetailButton,
    CommentNullImage
  },
  data() {
    return {
      deleteMessage: ""
    }
  },
  created() {
    const id = this.$route.params.id;
    this.$store.commit('comment/getComment', id);
  },
  computed: {
    ...mapState('comment', ['myComment']),
  },
  methods: {
    modifyComment() {
      const id = this.$route.params.id;
      this.$router.push('modify/' + id);
    },
    deleteComment() {
      const id = this.$route.params.id;
      axios.get(`${process.env.VUE_APP_URL}/api/post/delete/comment/` + id)
      .then(({data}) => {
        console.log("성공", data)
        this.deleteMessage = "삭제됐습니다."
        setTimeout(() => {
          this.$router.push('/user/board');
        },2000)
      })
      .catch(err => {
        console.error("delete comment", err);
      })
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
</style>