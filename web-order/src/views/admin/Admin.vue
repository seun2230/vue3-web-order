<template>
  <el-container class="container">
    <el-header>
      <Header />
    </el-header>
    <el-container>
      <el-aside>
        <SideBar />
      </el-aside>
      <el-main>
        <UploadForm />
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideBar from './components/SIdeBar.vue'
import UploadForm from '../../components/UploadFrom.vue'
import Header from './components/Header.vue'

export default {
  components: {
    SideBar,
    UploadForm,
    Header
  }
}
</script>

<style lang="scss" scoped>
.el-main {
  padding: 0px;
}
</style>