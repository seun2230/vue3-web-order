<template>
  <div class="container">
    <div class="order_item"
      v-for="order in orderList"
      :key="order.id"
      :order="order" >
      <div class="order_food">
        <p>{{ order.food_name }}</p>
      </div>
      <div class="order_price">
        <span>총 결제 금액 : {{ order.price }}</span>
      </div>
      <div class="order_quantity">
        <span>수량 : {{ order.quantity }}</span>
      </div>
      {{ order.order_date }}
      <el-button 
        type="text"
        @click="resetOrder()">주문 내역 삭제
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      
    }
  },
  created() {
    this.$store.commit("user/getOrderList")
  },
  methods: {
    resetOrder() {
      
    }
  },
  computed: {
    ...mapState('user', ['orderList'])
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 10px;
  display: grid;
}
.order_item {
  margin: 10px;
  min-height: 150px;
  border: 1px solid lightgrey;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
  text-align: center;
}
</style>