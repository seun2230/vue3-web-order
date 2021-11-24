<template>
  <div class="login_form">
    <div class="login">
      <input
        type="text"
        v-model="user_id"
        :key="user_id" />
      <input
        type="text"
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