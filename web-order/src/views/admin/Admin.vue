<template>
  <el-container class="container">
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
        <SideBar />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideBar from './components/SIdeBar.vue'
export default {
  components: {
    SideBar
  }
}
</script>

<style lang="scss" scoped>
body {
  padding: 0px;
  margin: 0px;
}
.container {
  height: 100vh;
  width: 100wh;
}
</style>