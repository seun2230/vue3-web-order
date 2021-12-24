<template>
  <div class="container">
    <el-row :gutter="10">
      <el-col
        :span="14">
        <AdminBoardList />
      </el-col>
      <el-col 
        :span="10">
        <AdminUserList />
      </el-col>
    </el-row>  
  </div>
</template>

<script>
import AdminUserList from '../components/AdminUserList.vue'
import AdminBoardList from '../components/AdminBoardList.vue'

export default {
  components: {
    AdminUserList,
    AdminBoardList,
  }
}
</script>

<style lang="scss" scoped>

</style>