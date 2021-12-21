<template>
  <div class="container">
    <h4 class="title">메뉴 관리</h4>
    <el-table
      ref="multipleTable"
      :data="foods"
      style="width: 100%">
      <el-table-column
        property="food_name"
        label="음식이름"
        show-overflow-tooltip
        width="120" />
      <el-table-column
        property="food_price"
        label="음식가격"
        width="90" />
      <el-table-column
        property="food_category"
        label="음식종류"
        width="90" />
      <el-table-column
        property="food_info"
        label="상세설명"
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
          <el-button
            type="text"
            size="small"
            @click.prevent="modifyRow(scope.$index)">
            Modify
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Modal 
      @close="closeModal()"
      :index="index"
      v-if="modal" />
  </div>
</template>

<script>
import Modal from '../components/modal/modal.vue'
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  components: {
    Modal,
  },
  data() {
    return {
      modal: false,
      index: ''
    }
  },
  created() {
    this.$store.commit("food/getState")
  },
  computed: {
    ...mapState('food', [
      'foods'
    ]),
  },
  methods: {
    deleteRow(index) {
      let delete_id = this.foods[index]
      axios.post(`${process.env.VUE_APP_URL}/api/admin/post/foodDelete`,
      JSON.stringify(delete_id),
      {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((res) => {
        console.log("server res data : ", res.data)
        this.$router.go('/admin/dashboard')
      })
      .catch(err => {
        console.log(err)
      })
    },
    modifyRow(index) {
      this.modal = true
      let modify_id = this.foods[index]
      this.index = modify_id;
    },
    closeModal() {
      this.modal = false
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
  .title {
    text-align: center;
  }
}

</style>