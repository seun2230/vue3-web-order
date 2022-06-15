<template>
  <div class="container">
    <CommentListChart />
    <div class="comment">
      <span class="comment__length">
        리뷰 {{ comments.length }}건
      </span>
      <div class="comment__filter">
        <span @click="bestComment">평점순</span>
        <span @click="sortDate">최신순</span>
      </div>
    </div>
    <div class="btn__group">
      <button
        type="text"
        class="btn btn--round"
        @click="writeComment()">
        리뷰 등록
      </button>
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
    CommentListChart,
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
        // console.log(x);
        // console.log(y);
        // console.log(x > y); // x가 큰 상태
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

<style lang="scss">
// @import '../assets/scss/_common.scss';

.comment {
  padding: 10px 20px;
  display: flex;
  width: auto;
  outline: none;
  border-radius: .2rem;
  color: #334455;
  font-size: 1rem;
  .comment__length {
    font-weight: bold;
    font-size: large;
  }
  .comment__filter {
    // float: right;
    margin-left: auto;

    span {
      padding: 5px;
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