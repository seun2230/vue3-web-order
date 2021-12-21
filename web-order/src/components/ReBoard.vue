<template>
  <div class="container">
    <el-button
      class="btn-comment"
      type="text"
      @click="writeComment()">등록</el-button>
    <ReBoardItem
      v-for="comment in paginatedData"
      :key="comment.comments_id"
      :comment="comment" />
    <div v-if="comments.length == 0">
      <p>등록된 리뷰가 없습니다.</p>
    </div>
    <div>
      <el-button @click="prevPage" type="text" :disabled="pageNum === 0">
        이전
      </el-button>
      <span class="page-count">{{ pageNum + 1}} / {{ pageCount }}</span>
      <el-button @click="nextPage" type="text" :disabled="pageNum >= pageCount -1">
        다음
      </el-button>
    </div>
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
  beforeCreate() {
    this.$store.commit('comment/getState')
  },
  create: {
    ...mapState('comment', [
      'comments'
    ])
  },
  data() {
    return {
      pageNum: 0,
      pageList: []
    }
  },
  methods: {
    nextPage() {
      this.pageNum += 1;
    },
    prevPage() {
      this.pageNum -= 1;
    },
    writeComment() {
      this.$router.push('/user/review');
    },
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
      return this.comments.slice(start, end)
    }
  },
}
</script>

<style lang="scss">
</style>