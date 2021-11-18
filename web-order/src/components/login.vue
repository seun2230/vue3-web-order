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
  </div>
</template>

<script>
import axios from 'axios'
import { useCookies } from 'vue3-cookies'

export default {
	data() {
		return {
			
		}
	},
  setup() {
    const { cookies } = useCookies();
    return { cookies }
  },
  mounted() {
    let my_cookie_value = this.cookies.get("table_jwt");
    console.log(my_cookie_value);
    
  },
	methods: {
		login() {
			const login_user = {
				user_id : this.user_id,
				user_password : this.user_password
			}
			axios.post('http://localhost:3000/login', 
				login_user,
				{
					headers: {
						'Content-Type' : "application/json"
					}
				}).then((res) => {
          this.cookies.set("table_jwt", "Bearer " + res.data.token )
				}).catch(function() {
					console.log('FAIL!')
				})
			}
	}
}
</script>