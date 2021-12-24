<template>
  <div class="container">
    <h4 class="title">조리 완료 내역</h4>
    <el-table
      ref="multipleTable"
      :data="paginatedData"
      style="width: 100%"
      align="center"
      header-align="center">
      <el-table-column
        property="id_order_num"
        label="주문 번호" />
      <el-table-column
        property="food_name"
        label="음식 이름"
        show-overflow-tooltip />
      <el-table-column
        property="order_quantity"
        label="주문 수량"
        width="100px"
        show-overflow-tooltip />
      <el-table-column
        property="order_status"
        label="주문 상태" />
      <el-table-column
        property="order_date"
        label="주문 시간"
        width="200px" />
      <el-table-column
        fixed="right"
        label="Operations"
        width="120px">
        <template #default="scope">
          <el-button
            type="text"
            size="small"
            @click.prevent="modifyRow(scope.$index)">
            조리완료
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
      default: 10,
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
    this.$store.commit("admin/getOrderListComplete")
  },
  computed: {
    ...mapState('admin', ['orderListComplete']),
    pageCount() {
      let listLength = this.orderListComplete.length,
          listSize = this.pageSize,
          page = Math.floor(listLength / listSize);
      if(listLength % listSize > 0) page += 1;
      return page;
    },
    paginatedData() {
      const start = this.pageNum * this.pageSize;
      const end = start + this.pageSize;
      return this.orderListComplete.slice(start, end);
    },
  },
  methods: {
    nextPage() {
      this.pageNum += 1;
    },
    prevPage() {
      this.pageNum -= 1;
    },
    modifyRow(index) {
      let modify_id = this.orderListComplete[index]
      axios.post(`${process.env.VUE_APP_URL}/api/admin/post/update/status`,
      JSON.stringify(modify_id),
      {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((res) => {
        console.log("server res data : ", res.data)
        this.$router.push('/admin/foodManagement')
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
  text-align: center;
  .title {
    text-align: center;
  }
}

</style>