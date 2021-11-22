<template>
  <div class="user_info">
    <div class="user_name">
    </div>
    <div class="user_order_list">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  mounted() {

  },
  created() {
    this.$store.dispatch("user/getUserInfo")
  }
}
</script>