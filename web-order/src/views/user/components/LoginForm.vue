<template>
  <div class="container">
    <el-form
      :model="form"
      label-position="top"
      label-width="100px">
      <el-form-item label="아이디">
        <el-input v-model="form.user_id" />
      </el-form-item>
      <el-form-item label="비밀번호">
        <el-input
          type="password"
          v-model="form.user_password" />
      </el-form-item>
    </el-form>
    <div class="btn-group">
      <el-button
        class="button"
        type="text"
        @click="login">
          로그인
      </el-button>
      <el-button
        class="button"
        type="text"
        @click="sign">
          회원가입
      </el-button>
    </div>
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
      console.log("ㅠㅠ",process.env.VUE_APP_URL)
      this.$store.dispatch('user/login', this.form)
    },
    sign() {
      this.$router.push('/user/sign');
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../../../scss/variables.scss";

.container {
  padding: 10px;
  background-color: $menuListBg;
  border-radius: 9px;
  .btn-group {
    display: grid;
  }
}
</style>
