<template>
  <div class="container">
    <el-form
      :model="form"
      label-width="100px">
      <el-form-item label="아이디">
        <el-input v-model="form.user_id" />
      </el-form-item>
      <el-form-item label="비밀번호">
        <el-input 
          type="password" 
          v-model="form.user_password" />
      </el-form-item>
      <el-button 
        class="button"
        type="text"
        @click="login">
          로그인
      </el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        user_id: '',
        user_password: '',
      }
    }
  },
  methods: {
    login() {
      console.log(this.form)
      this.$store.dispatch('user/login', this.form)
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 10px;
}
</style>
