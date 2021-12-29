<template>
  <div class="container">
    <el-row :gutter="10">
      <el-col
        :span="7">
        <FoodUploadForm />
      </el-col>
      <el-col :span="17">
        <AdminMenuList />
      </el-col>
    </el-row>  
  </div>
</template>

<script>
import FoodUploadForm from '../components/FoodUploadFrom.vue'
import AdminMenuList from '../components/AdminMenuList.vue'

export default {
  components: {
    FoodUploadForm,
    AdminMenuList,
  }
}
</script>

<style lang="scss" scoped>

</style>