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
        width="60px"
        show-overflow-tooltip />
      <el-table-column
        property="name"
        label="이름"
        width="80px" />
      <el-table-column
        property="ratings"
        label="평점"
        width="50px" />
      <el-table-column
        property="gender"
        label="성별"
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
          <el-button
            type="text"
            size="small"
            @click.prevent="viewRow(scope.$index)">
            View
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <BoardListModal 
      @close="closeModal()"
      :index="index"
      v-if="modal"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import BoardListModal from '../components/modal/BoardListModal.vue';

export default {
  components: {
    BoardListModal,
  },
  data() {
    return {
      modal: false,
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
      axios.post('http://localhost:3000/admin/delete/comments',
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
    viewRow(index) {
      this.modal = true
      let view_index = this.comments[index]
      this.index = view_index;
    },
    closeModal() {
      this.modal = false
      this.index = []
    }
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