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
    <AdminBoardList />
    <NullImageUploadForm />
    <imagePreveiw />
  </div>
</template>

<script>
import UploadForm from '../components/UploadFrom.vue'
import AdminMenuList from '../components/AdminMenuList.vue'
import SlideUploadForm from '../components/SlideUploadForm.vue'
import AdminBoardList from '../components/AdminBoardList.vue'
import NullImageUploadForm from '../components/NullImageUploadForm.vue';
import ImagePreveiw from '../../../components/ImagePreview.vue'

export default {
  components: {
    UploadForm,
    AdminMenuList,
    SlideUploadForm,
    AdminBoardList,
    NullImageUploadForm,
    ImagePreveiw,
  }
}
</script>

<style lang="scss" scoped>

</style>