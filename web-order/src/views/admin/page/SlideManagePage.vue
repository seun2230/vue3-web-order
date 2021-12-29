<template>
  <div class="container">
    <el-row :gutter="10">
      <el-col :span="7">
        <SlideImageUploadForm />
      </el-col>
      <el-col :span="17">
        <SlideImageList />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SlideImageUploadForm from '../components/SlideImageUploadForm.vue';
import SlideImageList from '../components/SlideImageList.vue'

export default {
  components: {
    SlideImageUploadForm,
    SlideImageList,
  }
}
</script>