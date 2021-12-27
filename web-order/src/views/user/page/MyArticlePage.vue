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
    // 하루 기준 시간 지나면 new badge가 없어짐
    formmatDate() {
      const nowDate = this.comment.comments_date;
      const year = +nowDate.split('-')[0];
      const month = +nowDate.split('-')[1];
      const day = +nowDate.split('-')[2]
      const nowDateObject = new Date(year, month, day);
      
    return new Date().getTime() - nowDateObject.getTime() < 24 * 60 * 60 * 1000; 
    
    },
    translateId() {
       const userId= this.comment.comments_user_id
       console.log(userId)
      if(typeof userId === 'string') {
        return userId.replace(/(?<=.).(?=.)/g, "*");
      }
      return null // return 값이 없으면 안됨
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
}

.text {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 220px;
  font-weight: 500;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>