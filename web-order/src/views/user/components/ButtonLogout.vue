<template>
  <div class="navbar__info">
    <el-button @click="logout" type="danger" size="small">로그아웃</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('user/logout');
    },
  }
}
</script>