<template>
  <div class="login">
    <div class="user_info">
      <div class="user_name">
        {{ user_infos.user_name }} 님 환영합니다.
      </div>
    </div>
  </div>
  <div class="not_login">
    <div class="message">
      <p>로그인 해주세요</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex' 

export default {
  computed: {
    ...mapState('user', ['user_infos'])
  } 
}
</script>

