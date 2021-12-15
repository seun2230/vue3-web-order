<template>
  <div class="container">
    <el-row :gutter="10">
      <el-col
        :span="9">
        <UploadForm />
        <SlideUploadForm />
      </el-col>
      <el-col :span="15">
        <AdminMenuList />
        <br/>
      </el-col>
    </el-row>  
    <PAGE />
    <AdminBoardList />
  </div>
</template>

<script>
import UploadForm from '../components/UploadFrom.vue'
import AdminMenuList from '../components/AdminMenuList.vue'
import SlideUploadForm from '../components/SlideUploadForm.vue'
import AdminBoardList from '../components/AdminBoardList.vue'
import PAGE from '../components/List.vue'

export default {
  components: {
    UploadForm,
    AdminMenuList,
    SlideUploadForm,
    AdminBoardList,
    PAGE,
  }
}
</script>

<style lang="scss" scoped>

</style>