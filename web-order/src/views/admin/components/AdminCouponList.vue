<template>
  <div class="container">
    <h4 class="title">
      쿠폰 리스트
    </h4>
    <button
      type="text"
      class="btn--gray btn--sm" 
      @click="onForm">
      등록
    </button>
    <div v-if="isActive">
      <CouponUploadForm />
    </div>
    <table>
      <th>쿠폰 번호</th>
      <th>쿠폰 이름</th>
      <th>쿠폰 종류</th>
      <th>쿠폰 날짜</th>
      <th>쿠폰 가격</th>
      <th>쿠폰 대상(사용자)</th>
      <th>수정</th>
      <th>삭제</th>
      <tr 
        v-for="coupon in couponList"
        :key="coupon.coupon_id">
        {{ coupon.coupon_users_user_id }}
        <td>{{ coupon.coupon_id }}</td>
        <td>{{ coupon.coupon_name }}</td>
        <td>{{ coupon.coupon_type }}</td>
        <td>{{ coupon.coupon_date }}</td>
        <td>{{ coupon.coupon_price }}</td>
        <td>{{ coupon.coupon_users_user_id }}</td>
        <td @click="onAdd">
          수정
        </td>
        <td @click="onDelete">
          수정
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import CouponUploadForm from '../components/CouponUploadForm.vue';
import { mapState } from 'vuex';

export default {
  components: {
    CouponUploadForm
  },
  data() {
    return {
      isActive: false
    }
  },
  created() {
    this.$store.commit("admin/getCouponList");
  },
  computed: {
    ...mapState('admin', ['couponList']),
  },
  methods: {
    onForm() {
      this.isActive = !this.isActive;
    },
    onAdd(){

    },
    onDelete() {

    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/scss/btn.scss';
@import '@/scss/common.scss';
.container {
  width: 0 auto;
  padding: 20px;
  background: #fff;
  .title {
    text-align: center;
  }
}

table {
  width: 100%;
  border-collapse: collapse;

  th {
    color: #909399;
  }
  th, td {
    border-bottom: 1px solid rgb(240, 238, 238);
    text-align: center;
    font-size: 14px;
    padding: 12px;
  }
}

</style>