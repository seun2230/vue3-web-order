<template>
  <div class="container">
    <div class="section-title">
      <h4 class="title">
        쿠폰 리스트
      </h4>
      <button
        type="text"
        class="btn--gray btn--sm" 
        @click="onForm">
        등록
      </button>
    </div>
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
      <th>옵션</th>
      <tr 
        v-for="coupon in couponList"
        :key="coupon.coupon_id">
        {{ index }}
        {{ coupon.coupon_users_user_id }}
        <td>{{ coupon.coupon_id }}</td>
        <td>{{ coupon.coupon_name }}</td>
        <td>{{ coupon.coupon_type }}</td>
        <td>{{ coupon.coupon_date }}</td>
        <td>{{ coupon.coupon_price }}</td>
        <td>{{ coupon.users_user_id }}</td>
        <td>
          <button
            type="text"
            @click.prevent="onModify(coupon)">
            수정
          </button>
          <button 
            type="text"
            @click.prevent="onDelete(coupon.coupon_id)">
            삭제
          </button>
        </td>
      </tr>
    </table>
    <div>
      <Coupon
        v-if="couponModal"
        :coupon-item="couponItem"
        @close="closeModal()">
        <template #footer>
        </template>
      </Coupon>
    </div>
  </div>
</template>

<script>
import CouponUploadForm from '../components/CouponUploadForm.vue';
import Coupon from '../components/modal/Coupon.vue';
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  components: {
    CouponUploadForm,
    Coupon
  },
  data() {
    return {
      isActive: false,
      couponModal: false,
      couponItem:''
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
    onModify(modifyId){
      console.log("couponModal modifyId", modifyId);
      this.couponItem = modifyId;
      // console.log(header, this.index);
      this.couponModal = true;
    },
    onDelete(deleteId) {
      console.log("coupon deleteId", deleteId);
      let couponId = { coupon_id: deleteId};
      axios.post(`${process.env.VUE_APP_URL}/api/admin/post/couponDelete`,
      JSON.stringify(couponId),
      {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((res) => {
        console.log("couponDelete respon success", res.data);
        this.$router.go();
      })
      .catch(err => {
        console.log("couponDelete response fail", err.response);
      })
    },
    closeModal() {
      this.couponModal = false;
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
  .section-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .btn--gray.btn--sm {
    height: 25px;
  }
  .title {
    text-align: left;
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