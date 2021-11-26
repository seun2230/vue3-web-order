<template>
  <div class="login_form">
    <div class="login">
      <input
        type="text" 
        placeholder="아이디를 입력해주세요."
        v-model="user_id"
        :key="user_id" />
      <input
        type="text"
        placeholder="비밀번호를 입력해주세요."
        v-model="user_password"
        :key="user_password" />
    </div>
    <button @click="login($event)">
      login
    </button>
    <button @click="logout()">
      logout
    </button>
  </div>
</template>

<script>
export default {
	data() {
		return {
			
		}
	},
  setup() {
  },
  mounted() {
  },

	methods: {
		login() {
			const login_user = {
				user_id : this.user_id,
				user_password : this.user_password
			}
      this.$store.dispatch('user/login', login_user)
		},
    logout() {
      this.$store.dispatch('user/logout')
    }
	}
}
</script>