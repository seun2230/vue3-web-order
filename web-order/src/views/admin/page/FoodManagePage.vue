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
    <br />
    <NullImageUploadForm />
    <SlideUploadForm />
  </div>
</template>

<script>
import FoodUploadForm from '../components/FoodUploadFrom.vue'
import AdminMenuList from '../components/AdminMenuList.vue'
import SlideUploadForm from '../components/SlideUploadForm.vue'
import AdminBoardList from '../components/AdminBoardList.vue'
import NullImageUploadForm from '../components/NullImageUploadForm.vue';

export default {
  components: {
    FoodUploadForm,
    AdminMenuList,
    SlideUploadForm,
    AdminBoardList,
    NullImageUploadForm,
  }
}
</script>

<style lang="scss" scoped>

</style>