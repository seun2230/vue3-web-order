<template>
  <el-table :data="order">
    <el-table-column
      prop="#"
      label="1"
      width="180" />
    <el-table-column
      prop="#"
      label="2"
      width="180" />
    <el-table-column
      prop="#"
      label="3"
      width="180" />
  </el-table>
</template>

<script>
import { mapState } from 'vuex';

export default {
  created: {
    food() {
      return this.$store.commit("food/getOrder");
    }
  },
  computed: {
    ...mapState('food', [
      'order'
    ])
  }
}
</script>

<style lang="scss" scoped>

</style>