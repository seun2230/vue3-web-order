<template>
  <div class="container">
    <h4 class="section-title">
      쿠폰 정보 등록
    </h4>
    <form>
      <div class="section-coupon">
        <label>쿠폰명</label>
        <input
          type="text"
          size="4" 
          placeholder="쿠폰명을 입력해주세요."
          v-model="name" /> 
        <label>쿠폰 종류</label>
        <select>
          <option 
            v-for="option in options"
            :key="option">
            <span :value="option"></span>{{ option }}
          </option>
        </select>
        <label>쿠폰 유효 기간</label>
        <div>
          <input 
            type="date"
            v-model="date" />~
          <input 
            type="date"
            v-model="date" />  
        </div>
        <label>쿠폰 비회원 노출 조건</label>
        <div class="coupon-filter">
          <div 
            v-for="radio in radios"
            :key="radio"
            :v-model="radio">
            <input 
              type="radio"
              :id="radio" />
            <span>{{ radio }}</span>  
          </div>
        </div>
        <label for="number">할인 가격</label>
        <div class="total-price">
          <input
            id="number"
            type="number" 
            placeholder="1000원부터 입력해주세요."
            v-model="totalPrice"
            min="1000"
            max="10000"
            step="1000" /> 
          <div 
            v-for="price in priceType"
            :key="price"
            :v-model="price">
            <input 
              type="radio"
              :id="price" />
            <span>{{ price }}</span>  
          </div>
        </div>
        <label>쿠폰 유저</label>
        <select>
          <option :v-model="selectedUser">
            전체
            {{ users.length }} 명
          </option>
          <option 
            v-for="user in users"
            :key="user.user_id"
            :v-model="selectedUser">
            {{ user.user_id }}
          </option>
        </select>             
        <label>쿠폰 이미지 등록</label>
        <div class="section-image">
          <AdminImagePreview @setData="setData" />
        </div>
      </div>
      <button 
        class="btn--orange btn--sm"
        type="button"
        @click="couponRegistration">
        등록
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import AdminImagePreview from '../components/AdminImagePreview.vue';
import { mapState } from 'vuex';
export default {
  components: { 
    AdminImagePreview,
  },
  created() {
    this.$store.commit('admin/getUserList');
  },
  computed: {
   ...mapState('admin', ['users']),
  },
  data() {
    return {
      files: [],
      name: '',
      date: '',
      totalPrice: '',
      priceType: ['%', '원'],
      selectedUser: '',
      options: [
        '전체 상품 쿠폰',
        '개별 상품 쿠폰',
        '기타 쿠폰'
      ],
      radios: ['노출함', '노출안함'],
    }
  },
  methods: {
    setData(imageFile) {
      this.files = imageFile;
    },
    couponRegistration() {
      let formData = new FormData();
      for(let i = 0; i < this.files.length; i++ ){
        let file = this.files[i].file;
        formData.append('files', file);
      }

      formData.append('name', this.name);
      formData.append('type', this.option);
      formData.append('date', this.date);
      formData.append('price', this.totalPrice);
      formData.append('percent', this.price);
      formData.append('user', this.selectedUser);
      formData.append('status', this.radio);


      axios.post(`${process.env.VUE_APP_URL}/api/admin/post/couponUpload`,
        formData,
        {
          headers: {
            "content-Type": "multipart/form-data"
          }
        }
      ).then(res => {
        console.log("couponUpload response success", res.data);
        // this.$router.go();
      }).catch(err => {
        console.log("couponeUpload response fail", err.response);
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/scss/btn.scss';
@import '@/scss/common.scss';

.container {
  width: 0 auto;
  padding: 20px;
  background: #ffffff;

  .section-title {
    text-align: center;
  }
  .section-coupon {
    display: flex;
    flex-direction: column;
    .coupon-filter {
      width: 300px;
      display: flex;
      flex-direction: row;  
    }
    .total-price {
      display: flex;
      flex-direction: row;
    }
  }
  .section-image {
    margin: 5px;
  }
  .btn--orange {
    margin: 5px;
    background: linear-gradient(#0751f1c9, $blue-900);
  }
}
</style>