<template>
  <div class="user_info">
    <div class="user_name">
      {{ user_infos.user_name }}
    </div>
    <div class="user_age">
      {{ user_infos.user_age }}
    </div>
    <div class="user_order_list">
      <MyOrderListItem
        v-for="user_order in user_orders"
        :key="user_order.id_order_list"
        :order="user_order" />
    </div>
    <button
      @click="userAlreadyOrder()">
      준비완료 내역 보기
    </button>
    <button
      @click="userNotReadyOrder()">
      준비 내역 보기
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MyOrderListItem from './admin/components/MyOrderListItem.vue'

export default {
  computed: {
    ...mapState('user', [
      'user_infos'
    ]),
    ...mapState('user', [
      'user_orders'
    ])
  },
  methods: {
    userAlreadyOrder() {
      this.$store.dispatch("user/user_orders", JSON.stringify({ num: 1}))
    },
    userNotReadyOrder() {
      this.$store.dispatch("user/user_orders", JSON.stringify({ num: 0 }))
    }
  },
  components: {
    MyOrderListItem
  }
}
</script>