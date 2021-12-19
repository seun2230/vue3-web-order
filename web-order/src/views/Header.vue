<template>
 <header>
    <nav class="nav">
      <div class="navbar__logo">
        <li><i class="fas fa-hamburger fa-2x"></i></li>
      </div>
      <div v-if="isAuth" class="login__user">
        {{ getUserName }}님 어서오세요!
      </div>
      <div v-if="!isAuth">
      </div>
   </nav>
 </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
    }
  },
  components: {
  },
  created() {
    console.log("sss",this.isAuth)
    if(!this.isAuth) {
      this.$store.commit('user/logout')
    }
    console.log('user', this.getUserName);
  },
  computed: {
    ...mapGetters('user', [
      'isAuth', 'getUserName'
    ]),
  },
}
</script>

<style lang="scss" scoped>
@mixin center {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header {
  padding: 10px;
  margin-top: 0;
  border-bottom: 1px solid #bcbcbc;

  .nav {
  @include center;

  }
}

.navbar__logo {
  li {
    padding: 0 5px;
    list-style-type: none;
    &:hover {
      color: red;
      cursor: pointer;
    }
  }
}

@media screen and (max-width: 768px) {

  .navbar__menu {
    display: none;

  }
}



</style>