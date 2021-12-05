<template>
  <el-menu
    :background-color="variables.menuBg">
    <el-menu-item index="1">
      <el-icon class="fas fa-home" />
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon class="fas fa-home" />
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon class="fas fa-home" />
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon class="fas fa-home" />
    </el-menu-item>
  </el-menu>
</template>

<script>
import variables from '../../../scss/variables.scss';

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

</style>