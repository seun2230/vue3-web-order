<template>
  <div class="container">
    <div class="inner">
      <h2>주문 현황</h2>
    <table class="table-list">
      <thread>
        <th>주문 번호</th>
        <th>메뉴 이름</th>
        <th>이미지</th>
        <th>수량</th>
        <th>메뉴 정보</th>
        <th>가격</th>
      </thread>
      <tbody>
        <tr v-for="order in orders" 
          :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.name }}</td>
          <td>{{ order.image }}</td>
          <td>{{ order.count }}</td>
          <td>{{ order.info }}</td>
          <td>{{ order.price }}</td>
        </tr>
      </tbody>
    </table>
    </div>
    
    <!-- {{ orders }} -->
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('food', [ 
      "orders"
    ])
  },
}
</script>

<style lang="scss" scoped>
@import "../scss/main.scss";

.container {
  margin-top: 30px;
  background-color: #fafafa;
  border-radius: 10px;

  .table-list {
    table-layout: fixed;  
    // word-break: break-all; // 줄바꿈 변화
    text-align: center;

    td, th {  
      width: 200px;
      border: 1px solid #ccc;
    }
  }
 
}

</style>