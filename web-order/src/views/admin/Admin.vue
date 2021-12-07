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
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideBar from './components/SIdeBar.vue'
import Header from './components/Header.vue'

export default {
  components: {
    SideBar,
    Header,
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/variables.scss";
@import "../../scss/index.scss";
.el-main {
  padding: 10px;
  background-color: $mainBg;
}
.el-aside {
  width: $sideBarWidth;
  padding: 0px;
  margin-bottom: 0px;
  background: $menuBg;
}
</style>