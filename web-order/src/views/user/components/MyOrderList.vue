<template>
  <div class="container">
    {{ orderList }}
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      
    }
  },
  created() {
    this.$store.commit("user/getOrderList")
  },
  computed: {
    ...mapState('user', ['orderList'])
  }
}
</script>

<style lang="scss" scoped>

</style>