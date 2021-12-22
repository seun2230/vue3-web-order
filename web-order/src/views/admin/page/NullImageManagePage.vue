<template>
  <div class="container">
    <el-row :gutter="10">
      <el-col :span="7">
        <NullImageUPload />
      </el-col>
      <el-col :span="17">
        <NullImageSlide />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import NullImageUPload from '../components/NullImageUploadForm.vue'
import NullImageSlide from '../components/NullImageSliede.vue'

export default {
  components: {
    NullImageUPload,
    NullImageSlide,
  }
}
</script>