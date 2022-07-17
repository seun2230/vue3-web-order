<template>
  <el-menu
    :router="true"
    :background-color="variables.$menuBg"
    :text-color="variables.$menuText"
    :unique-opened="false"
    :default-active="activeMenu"
    :active-text-color="variables.$menuActiveText"
    :collapse-transition="false">
    <el-menu-item
      index="/admin/order">
      <el-icon class="fas fa-bell" />
      <span>ORDER</span>
    </el-menu-item>
    <el-sub-menu>
      <template #title>
        <el-icon class="fas fa-cogs" />
        <span>MANAGEMENT</span>
      </template>
      <el-menu-item index="/admin/foodManagement">
        Food
      </el-menu-item>
      <el-menu-item index="/admin/userManagement">
        User
      </el-menu-item>
      <el-menu-item index="/admin/nullImage">
        NullImage
      </el-menu-item>
      <el-menu-item index="/admin/SlideImage">
        SlideImage/Notice
      </el-menu-item>
      <el-menu-item index="/admin/coupon">
        Coupon
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script>
import variables from '../../../constants/index'

export default {
  components: {
  },
  computed: {
    variables() {
      return variables
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      console.log("meta", meta)
      console.log("path", path)
      // if set path, the sidebar will highlight the path you set
      if(meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: 0px;
}
</style>