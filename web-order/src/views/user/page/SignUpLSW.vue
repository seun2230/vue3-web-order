<template>
  <div class="container">
    <el-form
      class="el-form"
      ref="form"
      :rules="rules"
      :model="form"
      label-width="100px">
        <el-form-item label="아이디" prop="user_id">
          <el-input v-model="form.user_id" />
        </el-form-item>
        <el-form-item label="비밀번호" prop="user_password">
          <el-input type="password" v-model="form.user_password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="비밀번호 확인" prop="user_passwordCheck">
          <el-input type="password" v-model="form.user_passwordCheck" autocomplete="off" />
        </el-form-item>
        <el-form-item label="이름" prop="user_name">
          <el-input v-model="form.user_name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="생년월일">
          <el-input type="date" v-model="form.user_birthday"/>
        </el-form-item>
        <el-form-item label="휴대전화" prop="user_phone">
          <el-input v-model="form.user_phone"/>
        </el-form-item>
        <el-form-item label="성별">
          <el-radio 
            v-model="form.user_gender" 
            label="male">
            남자
          </el-radio>
          <el-radio 
            v-model="form.user_gender"
            label="female">
            여자
          </el-radio>
        </el-form-item>
      <el-button 
        class="button"
        type="text"
        @click="onSubmit">
          회원 가입
      </el-button>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    const validateId = (rule, value, callback) => {
      const regex = /^[0-9]{1}[A-Za-z0-9]{5,19}$/;
      if (value === '') {
        return callback(new Error('아이디를 입력하세요.'));
      } else {
        setTimeout(() => {
          if (!regex.test(value)) {
            callback(new Error('첫자리는 숫자, 영문 포함 6~20 자리 까지 입력할 수 있습니다.'));
          } else {
            callback()
          } 
        }, 500)
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('비밀번호를 입력해주세요.'))
      } else {
        if (this.form.user_password !== '') {
          this.$refs.form.validateField('password')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('비밀번호를 입력해주세요.'))
      } else if (value !== this.form.user_password) {
        callback(new Error("비밀번호가 맞지 않습니다."))
      } else {
        callback()
      }
    }
    const validateName = (rule, value, callback) => {
      const regex = /^[가-힣]{2,4}$/;
      if (value === '') {
        callback(new Error('이름을 입력하세요.'));
      } else {
        setTimeout(() => {
          if (!regex.test(value)) {
            callback(new Error('이름은 한글로 2~4 글자 이내로 입력해주세요.'));
          } else {
            callback()
          } 
        }, 500)
      }
    }
    const validatePhone = (rule, value, callback) => {
      const regex = /^\d{3}-\d{3,4}-\d{4}$/;
      if (value === '') {
        callback(new Error("전화번호를 입력하세요."))
      } else {
        setTimeout(() => {
          if(!regex.test(value)) {
            callback(new Error("-를 포함해서 입력해주세요."))
          } else {
            callback()
          }
        }, 500)
      }
    }
    return {
      form: {
        user_id: '',
        user_name: '',
        user_password: '',
        user_passwordCheck: '',
        user_birthday: '',
        user_phone: '',
        user_gender: ''
      },
      rules: {
        user_id: [{ validator: validateId, trigger: "blur" }],
        user_password: [{ validator: validatePass, trigger: "blur" }],
        user_passwordCheck: [{ validator: validatePassCheck, trigger: "blur" }],
        user_name: [{ validator: validateName, trigger: "blur" }],
        user_phone: [{ validator: validatePhone, trigger: "blur" }]
      }
    }
  },
  methods: {
    onSubmit() {
      console.log("test", this.form)
      axios.post("http://localhost:3000/auth/register",
      JSON.stringify(this.form), {
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then((res) => {
        console.log("server res : ", res)
        this.$router.push('/user');
      })
      .catch((err) => {
        console.error(err);
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 10px;
}
</style>