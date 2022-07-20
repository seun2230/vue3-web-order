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
        <div 
          class="coupon-type"
          v-for="entity in entities"
          :key="entity">
          <input 
            type="radio"
            :value="entity"
            v-model="choice" />
          {{ entity }}
        </div>
        <select
          v-model="foodId">
          <option
            v-for="food in foods"
            :key="food.food_id">
            {{ food.food_id }}
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
          <input 
            type="radio" 
            id="option" 
            value="노출 함" 
            v-model="option" />노출 함
          <input 
            type="radio" 
            id="option" 
            value="노출 안함" 
            v-model="option" />노출 안함
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
          <div>
            <input 
              type="radio" 
              id="status" 
              value="%" 
              v-model="status" />%
            <input 
              type="radio" 
              id="status" 
              value="원" 
              v-model="status" />원
          </div>
        </div>
        <label>쿠폰 대상</label>
        <select
          v-model="selectedUser"
          multiple>
          <option 
            value="" 
            disabled>
            쿠폰 대상 선택
          </option>
          <option>
            전체
            {{ users.length }} 명
          </option>
          <option 
            v-for="user in users"
            :key="user.user_id">
            {{ user.user_id }}
          </option>
        </select>      
        {{ selectedUser }}       
        <label>쿠폰 이미지 등록</label>
        <div class="section-image">
          <AdminImagePreview @setData="setData" />
        </div>
      </div>
      <button 
        class="btn--blue btn--sm"
        type="button"
        @click="couponRegistration()">
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
    this.$store.commit('food/getState');

  },
  computed: {
   ...mapState('admin', ['users']),
   ...mapState('food', ['foods']),
  },
  data() {
    return {
      files: [],
      name: '',
      date: '',
      totalPrice: '',
      status: '',
      selectedUser: [],
      choic:'',
      foodId: '',
      radios: ['노출함', '노출안함'],
      entities: ['기타 쿠폰', '전체 상품 쿠폰', '개별 상품 쿠폰']
    }
  },
  methods: {
    setData(imageFile) {
      this.files = imageFile;
    },
    couponRegistration(food) {
      console.log("foods", food);
      let formData = new FormData();
      for(let i = 0; i < this.files.length; i++ ){
        let file = this.files[i].file;
        formData.append('files', file);
      }

      formData.append('name', this.name);
      formData.append('type', this.choice);
      formData.append('date', this.date);
      formData.append('price', this.totalPrice);
      formData.append('percent', this.status);
      formData.append('user', this.selectedUser);
      formData.append('status', this.option);
      formData.append('foodId', this.foodId);


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
    .coupon-type {
      width: 150px;
      display: flex;
      flex-direction: row;
    }
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
}
</style>