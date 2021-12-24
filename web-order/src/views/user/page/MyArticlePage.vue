<template>
  <div class="container">
    <MyArticleComp
      v-for="comment in paginatedData.slice().reverse()"
      :key="comment.mycomments_id"
      :comment="comment" />
    <div v-if="mycomments.length == 0">
      <p>아직 흥미로운 리뷰가 없습니다.</p>
    </div>
    <div class="page-view">
      <el-button @click="prevPage" type="text" :disabled="pageNum === 0">
        prev <i class="fas fa-angle-left"></i>
      </el-button>
      <span class="page-count">{{ pageNum + 1}} / {{ pageCount }}</span>
      <el-button @click="nextPage" type="text" :disabled="pageNum >= pageCount -1">
        next <i class="fas fa-angle-right"></i>
      </el-button>
    </div>
  </div>
</template>

<script>
import MyArticleComp from '../../user/components/MyArticleComp.vue';
import { mapState } from 'vuex';

export default {
  components: {
    MyArticleComp,
  },
  props: {
    pageSize: {
      type: Number,
      required: false,
      default: 6
    },
  },
  created() {
    this.$store.commit('comment/myArticle');
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
  },
  computed: {
    ...mapState('comment', ['mycomments']),
    pageCount() {
      let listLeng = this.mycomments.length,
          listSize = this.pageSize,
          page = Math.floor(listLeng / listSize);
      if(listLeng % listSize > 0) page += 1;
      return page;
    },
    paginatedData() {
      const start = this.pageNum * this.pageSize;
      const end = start + this.pageSize;
      return this.mycomments.slice(start, end)
    },
  },
}
</script>

<style scoped>

.btn-fade {
  position: fixed;
  bottom: 120px;
  right: 12px;
}
.btn-comment {
    width: 20vh;
    color:red;
    background: #fff;
    border-radius: 1rem;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.13);
    overflow: hidden;
}
.page-view {
  text-align: center;
}

.page-count {
  padding: 10px;
}
.star-ratings {
  color: #aaa9a9;
  position: relative;
  unicode-bidi: bidi-override;
  width: max-content;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 1.3px;
  -webkit-text-stroke-color: #2b2a29;
}

.star-ratings-fill {
  color: #fff58c;
  padding: 0;
  position: absolute;
  z-index: 1;
  display: flex;
  top: 0;
  left: 0;
  overflow: hidden;
  -webkit-text-fill-color: gold;
}

.star-ratings-base {
  z-index: 0;
  padding: 0;
}
</style>