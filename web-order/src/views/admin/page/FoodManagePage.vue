<template>
  <div class="container">
    <el-row :gutter="10">
      <el-col
        :span="9">
        <FoodUploadForm />
      </el-col>
      <el-col :span="15">
        <AdminMenuList />
        <br />
        <AdminBoardList />
      </el-col>
    </el-row>  
  </div>
</template>

<script>
import FoodUploadForm from '../components/FoodUploadFrom.vue'
import AdminMenuList from '../components/AdminMenuList.vue'
import AdminBoardList from '../components/AdminBoardList.vue'

export default {
  components: {
    FoodUploadForm,
    AdminMenuList,
    AdminBoardList,
  }
}
</script>

<style lang="scss" scoped>

</style>