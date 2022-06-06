<template>
  <div class="container">
    <ReBoardChart />
    <div class="comment">
      리뷰
      <span>{{ comments.length }}</span>
      <div>
        <span>평점순</span>
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
    <ReBoardItem
      v-for="comment in comments"
      :key="comment.comments_id"
      :comment="comment" />
    <div v-if="comments.length == 0">
      <p>등록된 리뷰가 없습니다.</p>
    </div>
  </div>
</template>

<script>
import ReBoardItem from './ReBoardItem.vue';
import ReBoardChart from './ReBoardChart.vue';
import { mapState } from 'vuex';

export default {
  components: {
    ReBoardItem,
    ReBoardChart
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
      'comments'
    ]),
  },
  beforeCreate() {
    this.$store.commit('comment/getState')
  },
  methods: {
    sortedDate() {
      // 최신순으로 정렬 
      // this.comments = 객체
      const dateList = this.comments;
      dateList.sort((a, b) => {
        return a.comments_date - b.comments_date;
      });
      // for (let i = 0; i < dateList.length; i++) {
      //   console.log("sotredDate", dateList[i].comments_date);
      // }
      return dateList.reverse();
    },
    writeComment() {
      this.$router.push('/user/mypage');
    },
  },
}
</script>

<style lang="scss">
@import '../assets/scss/_common.scss';

.nav {
  // margin: 20px;
  // // display: flex;
  // left: 30px;
}
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