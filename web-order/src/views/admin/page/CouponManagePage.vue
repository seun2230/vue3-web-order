<template>
  <div class="container">
    <div 
      class="icon-sort-up"
      @click="isShow">
      <span>쿠폰 정보 등록</span>
      <i class="fas fa-sort-down"></i>
      <CouponUploadForm />
    </div>
  </div>
</template>

<script>
import CouponUploadForm from '../components/CouponUploadForm.vue'
export default {
  components: {
    CouponUploadForm
  },
  data() {
    return {
      isActive: false,
    }
  },
  methods: {
    isShow() {
      this.isActive = !this.isActive;
    }
  }
}
</script>

