<template>
  <div class="container">
    <div class="nav">
      <span>평점순</span>
      <span>최신순</span>
      <button>사진 리뷰</button>
    </div>
    <div class="comment">
      전체 리뷰
      <span>{{ comments.length }}</span>
    </div>
    <div class="btn btn--fade">
      <button
        type="text"
        class="gd-button"
        @click="writeComment()">
        리뷰 등록
      </button>
    </div>
    <ReBoardItem
      v-for="comment in paginatedData"
      :key="comment.comments_id"
      :comment="comment" />
    <div v-if="comments.length == 0">
      <p>등록된 리뷰가 없습니다.</p>
    </div>
    <!-- <div class="page--view">
      <el-button 
        @click="prevPage" 
        type="text" 
        :disabled="pageNum === 0">
        prev <i class="fas fa-angle-left"></i>
      </el-button>
      <span class="page--count">{{ pageNum + 1}} / {{ pageCount }}</span>
      <el-button 
        @click="nextPage"
        type="text"
        :disabled="pageNum >= pageCount -1">
        next <i class="fas fa-angle-right"></i>
      </el-button>
    </div> -->
  </div>
</template>

<script>
import ReBoardItem from './ReBoardItem.vue'
import { mapState } from 'vuex';

export default {
  components: {
    ReBoardItem
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
    pageCount() {
      let listLeng = this.comments.length,
          listSize = this.pageSize,
          page = Math.floor(listLeng / listSize);
      if(listLeng % listSize > 0) page += 1;
      return page;
    },
    paginatedData() {
      const start = this.pageNum * this.pageSize;
      const end = start + this.pageSize;
      return this.comments.slice(start, end).reverse();
    },
  },
  beforeCreate() {
    this.$store.commit('comment/getState')
  },
  methods: {
    nextPage() {
      this.pageNum += 1;
    },
    prevPage() {
      this.pageNum -= 1;
    },
    writeComment() {
      this.$router.push('/user/mypage');
    }
  },
}
</script>

<style lang="scss">
@import '../assets/scss/_components.scss';

.nav {
  margin: 10px;
}
.comment {
  margin: 10px;
  padding: .5rem;
  width: 350px;
  outline: none;
  border-radius: .2rem;
  background-color: #f0eae4e8;
  // box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  color: #334455;
  font-size: 1rem;
}

.btn--fade {
  position: fixed;
  bottom: 100px;
  right: 12px;
  z-index: 30;
}

.page--view {
  text-align: center;
}

.page--count {
  padding: 10px;
}

</style>