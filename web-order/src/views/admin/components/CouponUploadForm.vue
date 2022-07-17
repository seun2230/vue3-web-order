<template>
  <div class="container">
    <h4 class="section-title">
      쿠폰 정보 등록
    </h4>
    <form>
      <div class="section-coupon">
        <label>쿠폰명</label>
        <input 
          v-model="name" />
        <label>쿠폰 설명</label>
        <input 
          v-model="description" /> 
        <label> 쿠폰 종류</label>
        <input 
          v-model="type" />
        <label>쿠폰 유효 기간</label>
        <input 
          v-model="date" /> 
        <label>쿠폰 조건</label>
        <input 
          v-model="filter" />                
        <label>쿠폰 할인가</label>
        <input 
          v-model="salePrice" /> 
        <label>쿠폰 유저</label>
        <input 
          v-model="selectedUser" />                
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
      description: '',
      type: '',
      date: '',
      filter: '',
      salePrice: '',
      selectedUser: ''
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
      formData.append('description', this.description);
      formData.append('type', this.type);
      formData.append('date', this.date);
      formData.append('filter', this.filter);
      formData.append('price', this.salePrice);
      formData.append('user', this.selectedUser);


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
@import '@/scss/variables.scss';

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
    label {
      margin: 5px;
    }
    input {
      margin: 5px;
      border-radius: .5rem;
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