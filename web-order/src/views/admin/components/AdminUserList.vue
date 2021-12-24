<template>
  <div class="container">
    <h4 class="title">유저 관리</h4>
    <el-table
      ref="multipleTable"
      :data="paginatedData"
      style="width: 100%">
      <el-table-column
        property="user_name"
        label="고객명"
        show-overflow-tooltip
        width="90" />
      <el-table-column
        property="user_id"
        label="고객 아이디"
        width="120" />
      <el-table-column
        property="user_phone"
        label="전화번호"
        width="140" />
      <el-table-column
        property="user_birthday"
        label="생일"
        width="90"
        show-overflow-tooltip />
      <el-table-column
        property="user_gender"
        label="성별"
        show-overflow-tooltip />
      <el-table-column
        fixed="right"
        label="Operations"
        width="120">
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
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  props: {
    pageSize: {
      type: Number,
      required: false,
      default: 5,
    }
  },
  data() {
    return {
      index: [],
      pageNum: 0,
      pageList: []
    }
  },
  created() {
    this.$store.commit("admin/getUserList")
  },
  computed: {
    ...mapState("admin", ["users"]),
    pageCount() {
      let listLength = this.users.length,
          listSize = this.pageSize,
          page = Math.floor(listLength / listSize);
      if(listLength % listSize > 0) page += 1;
      return page;
    },
    paginatedData() {
      const start = this.pageNum * this.pageSize;
      const end = start + this.pageSize;
      return this.users.slice(start, end)
    }
  },
  methods: {
    nextPage() {
      this.pageNum += 1;
    },
    prevPage() {
      this.pageNum -= 1;
    },
    deleteRow(e) {
      const id = {"user_id" :this.users[e].user_id}
      axios.post(`${process.env.VUE_APP_URL}/api/admin/post/delete/user`,
      JSON.stringify(id),
      {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((res) => {
        console.log("server res data : ", res.data)
        this.$router.go()
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>