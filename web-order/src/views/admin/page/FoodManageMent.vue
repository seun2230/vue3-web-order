<template>
  <el-row :gutter="10">
    <el-col
      :span="9">
      <UploadForm />
    </el-col>
    <el-col :span="15">
      <AdminMenuList />
    </el-col>
  </el-row>
</template>

<script>
import UploadForm from '../components/UploadFrom.vue'
import AdminMenuList from '../components/AdminMenuList.vue'

export default {
  components: {
    UploadForm,
    AdminMenuList
  }
}
</script>

<style lang="scss" scoped>

</style>