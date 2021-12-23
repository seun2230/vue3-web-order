<template>
  <div class="container">
    <div class="empty-item" v-if="this.orderList < 1">
      주문 내역이 존재하지 않습니다.
    </div>
    <div class="order_item" v-else
      v-for="order in orderList"
      :key="order.id"
      :order="order" >
      <div class="order_date">
        {{ order.order_date }} &nbsp;결제완료
      </div>
      <div class="del_modal">
        <button class="btn-area" @click="openModal()">
          <div class="del-btn">
          <icon-base icon-name="VerticalDots"
            width="33" height="32" >
            <vertical-dots />
          </icon-base>
          </div>
        </button>
        <ModalAdd
          @close="closeModal()"
          v-if="modal" />
      </div>
      <div class="order_food">
        <span>{{ order.food_name }}</span>
      </div>
      <div class="order_quantity">
        <span>수량 : {{ order.quantity }}</span>
      </div>
      <div class="order_price">
        <span>총 결제 금액 : {{ order.price }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import IconBase from '../../../assets/navicons/IconBase.vue'
import VerticalDots from '../../../assets/VerticalDots.vue'
import ModalAdd from '../components/ModalAdd.vue';

export default {
  components: {
    IconBase,
    VerticalDots,
    ModalAdd,
  },
  data() {
    return {
      isEmpty: true,
    }
  },
  created() {
    this.$store.commit("user/getOrderList")
  },
  methods: {
    resetOrder() {

    },
    openModal() {
      this.modal = !this.modal;
    },
    closeModal() {
      this.modal = false;
    }
  },
  computed: {
    ...mapState('user', ['orderList']),
  }
}
</script>

<style lang="scss" scoped>
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

// .del-btn {
// viewport scale 차이 문제
// 모달
// }

.order_item {
  margin: 10px;
  min-height: 150px;
  padding: 15px;
  border: 1px solid lightgrey;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
  text-align: right;
}

.order_date {
  margin-bottom: 10px;
  text-align: left;
  font-size: 0.9rem;
}

.order_food {
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.1rem;
}

.empty-item {
  padding: 20vh 10vw 0 10vw;
  text-align: center;
}
</style>