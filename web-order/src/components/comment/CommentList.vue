<template>
  <div class="container">
    <CommentListChart />  
    <div class="comment">
      <div class="comment__length">
        리뷰
        <span class="length">{{ comments.length }}건</span>
      </div>
      <div class="comment__filter">
        <span @click="bestComment">평점순</span>
        <span @click="sortDate">최신순</span>
      </div>
    </div>
    <CommentListItem
      v-for="comment in comments"
      :key="comment.comments_id"
      :comment="comment" />
    <div v-if="comments.length == 0">
      <p>등록된 리뷰가 없습니다.</p>
    </div>
  </div>
</template>

<script>
import CommentListItem from '../comment/CommentListItem.vue';
import CommentListChart from '../comment/CommentListChart.vue';
import { mapState } from 'vuex';

export default {
  components: {
    CommentListItem,
    CommentListChart
  },
  computed: {
    ...mapState('comment', [
      'comments',
    ]),
  },
  beforeCreate() {
    this.$store.commit('comment/getState')
  },
  mounted() {
    this.bestComment()
  },
  methods: {
    bestComment() {
      this.$store.commit('comment/bestComments')
    },
    sortDate() {
      const dateList = this.comments;
      dateList.sort((a, b) => {
        const x = new Date(a.comments_date).getDate();
        const y = new Date(b.comments_date).getDate();
        if ( x < y) {
          return false;
        }
      });
      dateList.reverse();
    },
    writeComment() {
      this.$router.push('/user/mypage');
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/scss/variables.scss';
.comment {
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-content: flex-end;
  width: auto;
  outline: none;
  border-bottom: 1px solid $gray-500;
  border-radius: .2rem;
  color: #334455;
  font-size: 1rem;
  .length {
    color: #ffae00;
    font-weight: bold;
    font-size: 18px;
  }
  .comment__filter {
    margin-left: auto;
    span {
      padding-left: 5px;
    }
  }
}
.btn__group {
  position: fixed;
  top: 60px;
  right: 20px;
  z-index: 1;
}
</style>