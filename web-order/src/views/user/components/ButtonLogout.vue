<template>
  <el-button plain @click="logout" type="danger" size="medium">로그아웃</el-button>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.commit('user/logout');
    },
  }
}
</script>