<template>
  <h1>
    관리자 페이지임
  </h1>
  <AddFood />
  <OrderList />
</template>

<script>
import AddFood from '../components/AddFood.vue'
import OrderList from '../components/OrderList.vue'

export default {
  components: {
    AddFood,
    OrderList
  }
}
</script>