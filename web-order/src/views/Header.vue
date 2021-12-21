<template>
  <div class="header">
    <div class="logo-area">
      <icon-base icon-name="Logo" class="icon-logo"
        width="90" height="40">
        <logo />
      </icon-base>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import IconBase from '../assets/navicons/IconBase.vue';
import Logo from '../assets/navicons/Logo.vue';

export default {
  components: {
    IconBase,
    Logo,
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
.header {
  display: flex;
  justify-content: start;
  height: 1vh;
  padding: 10px;
  margin-top: 0;
  border-bottom: 1px solid #bcbcbc;
}

@media screen and (min-width: 767px) {
  .header {
    display: flex;
  }
  .icon-logo {
    height: 60px;
    width: 60px;
  }
}

.logo-area {
    z-index: 50;
}



</style>