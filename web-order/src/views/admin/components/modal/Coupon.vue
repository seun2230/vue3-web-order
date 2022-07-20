<template>
  <transition
    name="modal"
    appear>
    <div class="modal modal-overlay">
      <div class="modal-window">
        <div>
          <form class="modal-content">
            <h3>{{ couponItem.coupon_name }}의 정보를 수정하세요.</h3>
            <label>쿠폰 이름</label>
            <input
              type="text"
              :placeholder="couponItem.coupon_name"
              v-model="modifyForm.name" />
            <label>쿠폰 종류</label>
            <select 
              :placeholder="couponItem.coupon_type"
              v-model="modifyForm.choice">
              <option
                v-for="entity in entities"
                :key="entity">
                {{ entity }}
              </option>  
            </select>
            <label>쿠폰 유효 기간</label>
            <input
              type="date" 
              :placeholder="couponItem.coupon_date"
              v-model="modifyForm.date" />
            <label>할인 가격</label>
            <input
              type="number" 
              min="10"
              max="10000"
              step="1000"
              :placeholder="couponItem.coupon_price"
              v-model="modifyForm.price" />
            <label>쿠폰 대상자</label>
            <select
              :placeholder="couponItem.users_user_id"
              v-model="modifyForm.userInfo">
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
          </form>
        </div>
        <footer class="modal-footer">
          <slot name="footer"></slot>
          <button 
            type="text"
            @click="$emit('close')">
            닫기
          </button>
          <button
            type="text"
            @click="submit(this.modifyForm)">
            제출
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
export default {
  props: {
    couponItem: {
      type: Object,
      default: function() { return {} }
    }
  },
  emits: ['close'],
  data() {
    return {
      modifyForm: {
        couponId: this.couponItem.coupon_id,
        name: "",
        choice: "",
        date: "",
        price: "",
        userInfo: "",
      },
      entities: [
        '전체 상품 쿠폰',
        '개별 상품 쿠폰',
        '기타 쿠폰'
      ]
    }
  },
  created() {
    this.$store.commit('admin/getUserList');
  },
  computed: {
   ...mapState('admin', ['users']),
  },
  methods: {
    submit(modifyForm) {
      console.log("data", modifyForm);
      axios.post(process.env.VUE_APP_URL + "/api/admin/post/couponModify",
      JSON.stringify(modifyForm),
      {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((res) => {
        console.log("modifyForm response success", res.data);
        // this.$router.go();
      })
      .catch(err => {
        console.log("modifyForm response fail", err.response);
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/variables.scss';

.container {
  padding: 10px;
  background: #ffffff;
  border-radius: 2px;
  .title {
    text-align: center;
  }
}

.modal {
  &.modal-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  &-window {
    padding: 10px;
    background: $mainBg;
    border-radius: 4px;
    overflow: hidden;
  }
  &-content {
    border-radius: 4px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 500px;
    height: 500px;
  }
  &-footer {
    width: 500px;
    padding: 10px;
    text-align: center;
  }
}

.modal-enter-active, .modal-leave-active {
  transition: opacity 0.4s;

  .modal-window {
    transition: opacity 0.4s, transform 0.4s;
  }
}

.modal-leave-active {
  transition: opacity 0.6s ease 0.4s;
}

.modal-enter, .modal-leave-to {
  opacity: 0;

  .modal-window {
    opacity: 0;
    transform: translateY(-20px);
  }
}
</style>