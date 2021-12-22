<template>
  <div class="container">
    <h4 class="title">게시판 관리</h4>
    <el-table
      ref="multipleTable"
      :data="paginatedData"
      style="width: 100%">
      <el-table-column
        property="title"
        label="제목"
        show-overflow-tooltip
        width="120px" />
      <el-table-column
        property="food_name"
        label="음식이름"
        width="100px"
        show-overflow-tooltip />
      <el-table-column
        property="text"
        label="내용"
        show-overflow-tooltip />
      <el-table-column
        property="id"
        label="ID"
        width="120px"
        show-overflow-tooltip />
      <el-table-column
        property="ratings"
        label="평점"
        width="50px" />
      <el-table-column
        fixed="right"
        label="Operations"
        width="120px">
        <template #default="scope">
          <el-button
            type="text"
            size="small"
            @click.prevent="deleteRow(scope.$index)">
            Remove
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-view">
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
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  props: {
    pageSize: {
      type: Number,
      required: false,
      default: 5,
    },
  },
  components: {
  },
  data() {
    return {
      index: [],
      pageNum: 0,
      pageList: [],
    }
  },
  created() {
    this.$store.commit("admin/getComments")
  },
  computed: {
    ...mapState('admin', [
      'comments'
    ]),
    pageCount() {
      let listLength = this.comments.length,
          listSize = this.pageSize,
          page = Math.floor(listLength / listSize);
      if(listLength % listSize > 0) page += 1;
      return page;
    },
    paginatedData() {
      const start = this.pageNum * this.pageSize;
      const end = start + this.pageSize;
      return this.comments.slice(start, end);
    },
  },
  methods: {
    nextPage() {
      this.pageNum += 1;
    },
    prevPage() {
      this.pageNum -= 1;
    },
    deleteRow(index) {
      let delete_id = this.comments[index]
      axios.post(`${process.env.VUE_APP_URL}/api/admin/post/commentDelete`,
      JSON.stringify(delete_id),
      {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((res) => {
        console.log("server res data : ", res.data)
        this.$router.go('/admin/foodManagement')
      })
      .catch(err => {
        console.log(err)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  padding: 10px;
  background: #ffffff;
  border-radius: 2px;
  .title {
    text-align: center;
  }
}

</style>