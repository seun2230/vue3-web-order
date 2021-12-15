<template>
  <div class="navbar__info">
    <router-link to='/user/login' v-slot='{href, navigate}'
      :href='href' @click='navigate'
      class='routerBtn'>
      <el-button type="danger" size="small">로그인</el-button>
    </router-link>
  </div>
</template>

<script>
export default {

}
</script>