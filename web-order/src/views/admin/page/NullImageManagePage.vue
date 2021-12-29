<template>
  <div class="container">
    <el-row :gutter="10">
      <el-col :span="7">
        <NullImageUploadForm />
      </el-col>
      <el-col :span="17">
        <NullImageItem />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import NullImageUploadForm from '../components/NullImageUploadForm.vue'
import NullImageItem from '../components/NullImageItem.vue'

export default {
  components: {
    NullImageUploadForm,
    NullImageItem,
  }
}
</script>