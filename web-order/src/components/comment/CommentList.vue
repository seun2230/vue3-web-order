<template>
  <div class="container">
    <CommentListChart />
    <div class="comment">
      리뷰
      <span>{{ comments.length }}</span>
      <div>
        <span @click="bestComment">평점순</span>
        <span @click="sortedDate">최신순</span>
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
    CommentListChart
  },
  props: {
    pageSize: {
      type: Number,
      required: false,
      default: 4
    },
  },
  data() {
    return {
      pageNum: 0,
      pageList: []
    }
  },
  computed: {
    ...mapState('comment', [
      'comments',
      'bestcomments'
    ]),
  },
  beforeCreate() {
    this.$store.commit('comment/getState')
  },
  methods: {
    bestComment() {
      this.$store.commit('comment/bestComments')
    },
    sortedDate() {
      // 최신순으로 정렬 
      // 다시 작성 필요함
      const dateList = this.comments;
      dateList.sort((a, b) => {
        const x = new Date(a.comments_date).getDate();
        const y = new Date(b.comments_date).getDate();
        console.log(x);
        console.log(y);
        console.log(x > y); // x가 큰 상태
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
  margin: 10px;
  padding: .5rem;
  width: auto;
  outline: none;
  border-radius: .2rem;
  background-color: #f0eae4e8;
  // box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  color: #334455;
  font-size: 1rem;
}

.btn__group {
  position: fixed;
  top: 60px;
  right: 20px;
  z-index: 1;
}

.page--view {
  text-align: center;
}

.page--count {
  padding: 10px;
}

</style>