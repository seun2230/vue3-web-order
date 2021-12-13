<template>
  <el-page-header content="detail" @back="goBack" />
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(1);
    }
  }
}
</script>