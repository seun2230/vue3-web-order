<template>
  <div class="navbar__info">
    <router-link to='/user/sign' v-slot='{href, navigate}'
      :href='href' @click='navigate'
      class='routerBtn'>
      <el-button type="danger" size="small">회원가입</el-button>
    </router-link>
  </div>
</template>

<script>
export default {

}
</script>