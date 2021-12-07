<template>
  <el-menu
    :background-color="variables.$menuBg"
    :text-color="variables.$menuText"
    :unique-opened="false"
    :active-text-color="variables.$menuActiveText"
    :collapse-transition="false">
    <el-menu-item
      index="1"
      to="/home">
      <el-icon class="fas fa-home" />
      <span>HOME</span>
    </el-menu-item>
    <el-menu-item
      index="2"
      to="/order">
      <el-icon class="fas fa-bell" />
      <span>ORDER</span>
    </el-menu-item>
    <el-sub-menu
      index="3"
      to="charts">
      <template #title>
        <el-icon class="fas fa-chart-bar" />
        <span>CHART</span>
      </template>
      <el-menu-item index="3-1">
        MONTH
      </el-menu-item>
      <el-menu-item index="3-2">
        WEEK
      </el-menu-item>
      <el-menu-item index="3-3">
        DAY
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item
      index="4"
      to="edit">
      <el-icon class="fas fa-cogs" />
      <span>MANAGEMENT</span>
    </el-menu-item>
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
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: 0px;
}
</style>