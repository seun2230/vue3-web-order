<template>
  <div class="container">
    <el-table
      ref="multipleTable"
      :data="comments"
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  components: {
  },
  data() {
    return {
      index: [],
    }
  },
  created() {
    this.$store.commit("admin/getComments")
  },
  computed: {
    ...mapState('admin', [
      'comments'
    ]),
  },
  methods: {
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
@import '../../../scss/variables.scss';

.container {
  padding: 10px;
  background: #ffffff;
  border-radius: 2px;
}

</style>