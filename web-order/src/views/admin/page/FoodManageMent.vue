<template>
  <el-row :gutter="10">
    <el-col
      :span="9">
      <UploadForm />
      <SlideUploadForm />
    </el-col>
    <el-col :span="15">
      <AdminMenuList />
    </el-col>
  </el-row>
</template>

<script>
import UploadForm from '../components/UploadFrom.vue'
import AdminMenuList from '../components/AdminMenuList.vue'
import SlideUploadForm from '../components/SlideUploadForm.vue'

export default {
  components: {
    UploadForm,
    AdminMenuList,
    SlideUploadForm
  }
}
</script>

<style lang="scss" scoped>

</style>