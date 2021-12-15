<template>
  <div class="container">
    <el-form
      class="el-form"
      ref="form"
      :rules="rules"
      :model="form"
      label-position="top"
      label-width="100px">
      <el-form-item
        label="아이디"
        prop="user_id">
        <el-input v-model="form.user_id" />
      </el-form-item>
      <el-form-item
        label="비밀번호"
        prop="user_password">
        <el-input
          type="password"
          v-model="form.user_password"
          autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="비밀번호 확인"
        prop="user_passwordCheck">
        <el-input
          type="password"
          v-model="form.user_passwordCheck"
          autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="이름"
        prop="user_name">
        <el-input
          v-model="form.user_name"
          autocomplete="off" />
      </el-form-item>
      <!-- <el-form-item label="생년월일">
        <el-input
          type="date"
          v-model="form.user_birthday"/>
      </el-form-item> -->
      <el-form-item
        label="생년월일"
        prop="user_birthday">
        <el-input
          v-model="form.user_birthday"
          maxlength="8"
          placeholder="8자리로 입력하세요." />
      </el-form-item>
      <el-form-item
        label="휴대전화"
        prop="user_phone">
        <el-input
          v-model="form.user_phone"
          maxlength="11"
          placeholder="- 를 제외하고 입력하세요."/>
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
        @click="submitForm">
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
      const regex = /^[a-zA-Z0-9]{6,20}/g;
      if (value === '') {
        return callback(new Error('아이디를 입력하세요.'));
      } else {
        setTimeout(() => {
          if (!regex.test(value)) {
            callback(new Error('6~20자의 영문과 숫자만 입력할 수 있습니다.'));
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
      const regex = /^[가-힣a-zA-z]+$/;
      if (value === '') {
        callback(new Error('이름을 입력하세요.'));
      } else {
        setTimeout(() => {
          if (!regex.test(value)) {
            callback(new Error('이름은 한글 또는 영문 대,소문자로 입력하세요.'));
          } else {
            callback()
          }
        }, 500)
      }
    }
    const validateBirthDay = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('필수 정보입니다.'));
            } else {
                const year = Number(value.substr(0, 4));
                const month = Number(value.substr(4, 2));
                const day = Number(value.substr(6, 2));
                const thisYear = new Date().getFullYear();

                if (value.length == 8) {
                    if (1900 > year || year > thisYear) {
                        callback(new Error('올바른 년도를 입력하세요.'));
                    } else if (month < 1 || month > 12) {
                        callback(new Error('올바른 월을 입력하세요'));
                    } else if (day < 1 || day > 31) {
                        callback(new Error('올바른 날짜를 입력하세요.'));
                    } else if ((month == 4 || month == 6 || month == 9 || month == 11) && day == 31) {
                        callback(new Error('올바른 날짜를 입력하세요.'));
                    } else if (month == 2) {
                        const isLeap = (year % 4 == 0 && (year % 100 == 0 || year % 400 == 0));
                        if (day > 29 || (day == 29 && !isLeap)) {
                            callback(new Error('올바른 날짜를 입력하세요.'));
                        } else {
                            return callback();
                        }
                    } else {
                        return callback();
                    }
                } else {
                    callback(new Error('8자리 생년월일을 입력하세요'));
                }
            }
        }
    const validatePhone = (rule, value, callback) => {
      const regex = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
      if (value === '') {
        callback(new Error("전화번호를 입력하세요."))
      } else {
        setTimeout(() => {
          if(!regex.test(value)) {
            callback(new Error("올바른 전화번호를 입력하세요."))
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
        user_birthday: [{ validator: validateBirthDay, trigger: "blur" }],
        user_phone: [{ validator: validatePhone, trigger: "blur" }]
      }
    }
  },
  methods: {
    submitForm() {
      axios.post('http://localhost:3000/api/auth/register',
      JSON.stringify(this.form),
      {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        console.log(res)
        this.$router.push('/user/login')
      })
      .catch(err => {
        console.log(err)
      })
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../scss/variables.scss";

.container {
  padding: 10px;
  background-color: $menuListBg;
  border-radius: 9px;
}
</style>