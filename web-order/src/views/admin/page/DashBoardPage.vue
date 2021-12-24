<template>
  <div class="container">
    <el-row :gutter="10">
      <el-col
        :span="7" />
      <el-col 
        :span="17">
        <AdminUserList />
      </el-col>
    </el-row>  
  </div>
</template>

<script>
import AdminUserList from '../components/AdminUserList.vue'
export default {
  components: {
    AdminUserList,   
  }
}
</script>

<style lang="scss" scoped>

</style>