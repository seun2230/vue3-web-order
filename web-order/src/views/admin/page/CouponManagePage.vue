<template>
  <div class="container">
    <div>
      <AdminCouponList />
    </div>
  </div>
</template>

<script>
import AdminCouponList from '../components/AdminCouponList.vue'
export default {
  components: {
    AdminCouponList
  },
  data() {
    return {}
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
span {
  font-size: 16px;
}
</style>
