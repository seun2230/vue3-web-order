<template>
  <div class="container">
    <el-row :gutter="10">
      <el-col :span="12">
        <NullImageUPload />
      </el-col>
      <el-col :span="12" />
    </el-row>
  </div>
</template>

<script>
import NullImageUPload from '../components/NullImageUploadForm.vue'

export default {
  components: {
    NullImageUPload,
  }
}
</script>