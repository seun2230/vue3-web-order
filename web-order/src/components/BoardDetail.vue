<template>
  <div class="container">
    <div class="inner">
      <div class="inner__left">
        <el-avatar>{{ myComment.comments_user_id }}</el-avatar>
        <div class="inner__item">
          <span 
            :style="{'font-weight': 'bold' }">
            {{ myComment.comments_user_id }}
          </span>
          <span>{{ formmatDate }}</span>
        </div>
      </div>
      <div class="item">
        <CommentDetailModal />
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
          class="btn--orange btn--sm"
          @click.self.prevent="writeReply()">
          등록
        </button>
      </div>
      <ReplyList
        v-for="reply in replys"
        :reply="reply"
        :key="reply.id_reply"
        :my-comment="this.myComment" />
      <div 
        class="btn_more">
        <button 
          v-if="replys.length > 1"
          class="btn--round btn--xl"
          @click="moreReplyList()">
          댓글 더보기
        </button>
      </div> 
    </div>
  </div>
</template>

<script>
import CommentDetailModal from './comment/CommentDetailModal.vue'
import CommentDetailButton from './comment/CommentDetailButton.vue'
import CommentNullImage from './comment/CommentNullImage.vue';
import ReplyList from './reply/ReplyList.vue';
import { mapState } from 'vuex';

export default {
  components: {
    CommentDetailModal, 
    CommentDetailButton,
    CommentNullImage,
    ReplyList
  },
  props: {
     page: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      deleteMessage: "",
      show: '',
      textarea: '', 
    }
  },
  created() {
    const id = this.$route.params.id;
    const page = this.$route.params.page;
    const data = { id , page};
    this.$store.commit('comment/getComment', data);
    this.$store.commit('reply/getReply', data);
  },
  computed: {
    ...mapState('comment', ['myComment']),
    ...mapState('reply', ['replys']),
    formmatDate() {
      const commentDate = this.myComment.comments_date;
      console.log("nowDate", commentDate);
      const formmatDate = commentDate.replace(/(\d{4}).(\d{2}).(\d{2})/,'$1.$2.$3');
      return formmatDate;
    },
  },
  methods: {
    showReply() {
      this.show = true;
    },
    writeReply() {
      const id = this.$route.params.id;
      const foodId =  this.myComment.food_items_food_id;
      const text = this.textarea;

      let data = [{ "food_id": foodId,
        "comment_text": text,
        "comment_id": id }];

      this.$store.dispatch('reply/writeReply', data);
      this.textarea='';
    }, 
    moreReplyList() {
      const id = this.$route.params.id; 
      const page = this.$route.params.page; 
      const reply_id = this.replys[0].id_reply;
      console.log("ReplyId", reply_id);
      const data = { id , page, reply_id}; 
      this.$store.commit('reply/getMoreReply', data);
    }
  }
}
</script>

<style lang="scss" scoped >
@import '@/scss/variables.scss';
@import '@/scss/btn.scss';
.inner {
  padding: 20px;
  height: auto;
}
.inner__left {
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  .inner__item {
    margin-left: 10px;
    height: auto;
    span {
      display: block;
      color: $gray-text;
    }
  }
}
.item {
  position: absolute;
  top: 70px;
  right: 30px;
  color: $gray-600;
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
  height: 40px;
}
</style>