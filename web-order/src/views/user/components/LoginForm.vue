<template>
  <div class="container">
    <el-form
      :model="form"
      label-position="top"
      label-width="100px">
      <el-form-item>
        <el-input v-model="form.user_id"
          placeholder="아이디를 입력하세요." />
      </el-form-item>
      <el-form-item>
        <el-input class="text-input"
          type="password"
          v-model="form.user_password"
          placeholder="비밀번호를 입력하세요." />
      </el-form-item>
    </el-form>
    <div class="btn-group">
      <el-button
        class="login-button"
        type="default"
        size="large"
        @click="login">
          로그인
      </el-button>
      <div class="signup-group">
        <span>아직 회원이 아니신가요?</span>  &nbsp;&nbsp;
        <el-button
          class="signup-button"
          type="default"
          size="medium"
          @click="sign">
            회원가입
        </el-button>
      </div>
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
  padding: 20px;
  margin-top: 25vw;
  max-width: 460px;
    .btn-group {
    display: flex;
    flex-direction: column;
  }
}

.el-input__inner {
  height: 40vw !important;
}

.login-button {
  color: white;
  background-color: rgba($color: #000000, $alpha: 0.9);
}

.signup-group {
  display: flex;
  justify-content: end;
  font-size: 0.9rem;
  align-items: baseline;
  margin-top: 10px;
  .signup-button {
    width: 25vw;
    margin-top: 10px;
    text-align: center;
  }
}

</style>
