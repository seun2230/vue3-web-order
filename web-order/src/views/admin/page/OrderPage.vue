<template>
  <div class="container">
    <el-row :gutter="10">
      <el-col 
        :span="12">
        <OrderList />
      </el-col>
      <el-col
        :span="12">
        <OrderListComplete />
      </el-col>
    </el-row>  
  </div>
</template>

<script>
import OrderList from '../components/AdminOrderList.vue'
import OrderListComplete from '../components/AdminOrderListComplete.vue'

export default {
  components: {
    OrderList,
    OrderListComplete,
  }
}
</script>

<style lang="scss" scoped>

</style>