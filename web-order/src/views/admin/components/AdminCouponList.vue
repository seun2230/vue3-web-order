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
      </tr>
      <button
        type="text"
        @click.prevent="onModify()">
        수정
      </button>
      <button 
        type="text"
        @click.prevent="onDelete()">
        삭제
      </button>
    </table>
    <div>
      <Coupon
        :coupon="this.couponList"
        v-if="couponModal" />
    </div>
  </div>
</template>

<script>
import CouponUploadForm from '../components/CouponUploadForm.vue';
import Coupon from '../components/modal/Coupon.vue';
import { mapState } from 'vuex';

export default {
  components: {
    CouponUploadForm,
    Coupon
  },
  data() {
    return {
      isActive: false,
      couponModal: true,
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
    onModify(){
      this.couponModal = true;
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