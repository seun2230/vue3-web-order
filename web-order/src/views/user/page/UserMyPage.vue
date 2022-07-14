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
        {{ order.order_date.slice(0,10) }} 
        <div class="order_done">
          결제완료
        </div>
        <!-- <img
        :src="order.food_image1"
        :alt="order.food_name" /> -->
        <img src="../../../assets/cook.jpg" />
      </div>
      <div class="order_info">
        <div class="order_food">
          <span :style="{ 'font-weight': 'bold'}">
            {{ order.food_name }}
          </span>
        </div>
        <div class="order_option">
          <span>수량 : {{ order.quantity }}</span>
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
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';


export default {
  data() {
    return {
      isEmpty: true,
    }
  },
  created() {
    this.$store.commit("user/getOrderList")
    this.$store.commit("comment/getState")
  },
  computed: {
    ...mapState('user', ['orderList']),
    ...mapState('comment', ['comments']),
    ...mapGetters('comment', ['isDisabledBtn']),
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
  width: 370px;
  min-height: 150px;
  padding: 10px;
  border: 1px solid lightgrey;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
  text-align: right;
  display: flex;
  flex-direction: row;
}
.order_date {
  width: 30%;
  padding: 10px;
  margin-bottom: 10px;
  text-align: left;
  font-size: 0.9rem;
  color: $gray-text;
  .order_done {
    margin: 5px;
    color: $orange-400;
    font-weight: 500;
  }
  img {
    width: 100px;
    height: 100px;
    border-radius: .2rem;
  }
}
.order_info {
  width: 70%;
  padding: 30px;
  text-align: left;
  font-weight: 500;
  .order_food {
    margin: 3px 0px;
    font-size: 1.2rem;
    // background-color: red;
  }
  .order_option{
    span {
      display: block;
    }
  }
}
.empty-item {
  padding: 20vh 10vw 0 10vw;
  text-align: center;
}
.reviw-btn-area {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
}
</style>
