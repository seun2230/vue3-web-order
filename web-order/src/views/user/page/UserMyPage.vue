<template>
  <div class="container">
    <div 
      class="empty-item" 
      v-if="this.orderList < 1">
      주문 내역이 존재하지 않습니다.
    </div>
    <div 
      class="order_item" 
      v-else
      v-for="order in orderList.slice().reverse()"
      :key="order.id"
      :order="order">
      <div class="order_date">
        {{ order.order_date }} 
        <span class="order_done">
          결제완료
        </span>
      </div>
      <div class="order_food">
        <span>{{ order.food_name }}</span>
      </div>
      <div class="order_quantity">
        <span>수량 : {{ order.quantity }}</span>
      </div>
      <div class="order_price">
        <span> {{ order.price }}원</span>
      </div>
      <div class="reviw-btn-area">
        <button
          class="btn--gray btn--md"
          @click="repurchase()">
          재구매
        </button>
        <router-link 
          :to="{name: 'review', params: { id: order.food_id }}">
          <button
            class="btn--orange btn--md"
            type="default">
            리뷰 작성
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';


export default {
  data() {
    return {
      isEmpty: true,
    }
  },
  created() {
    this.$store.commit("user/getOrderList")
  },
  computed: {
    ...mapState('user', ['orderList']),
  },
  methods: {
    repurchase() {
      this.$router.push('/user/menu');
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/variables.scss';
@import '@/scss/btn.scss';

.container {
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.btn-area {
  border: none;
  margin-top: 20px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  align-content: stretch;
  background-color: white;
}
.order_item {
  margin: 10px;
  min-height: 150px;
  padding: 10px;
  border: 1px solid lightgrey;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
  text-align: right;
}

.order_date {
  margin-bottom: 10px;
  text-align: left;
  font-size: 0.9rem;
  color: $gray-text;
}

.order_done {
  margin-top: 5px;
  color: $orange-400;
  font-weight: 500;
}
.order_food {
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 1.2rem;
}

.order_price {
  margin-top: 5px;
  font-weight: 700;
}

.empty-item {
  padding: 20vh 10vw 0 10vw;
  text-align: center;
}

.reviw-btn-area {
  margin-top: 10px;
}
</style>
