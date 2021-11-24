<template>
  <div class="container">
    <div class="inner">
      <h2>주문 현황</h2>
    <table class="table-list">
      <thread>
      <tr>
        <th>주문 번호</th>
        <th>메뉴 이름</th>
        <th>이미지</th>
        <th>수량</th>
        <th>메뉴 정보</th>
        <th>가격</th>
      </tr>
      </thread>
      <tbody>
        <tr 
          v-for="(order, i) in order[0]" 
          :key="i">
          <td>{{ order.food_id }}</td>
          <td>{{ order.food_name }}</td>
          <td>{{ order.food_image1 }}</td>
          <td>{{ order.quantity }}</td>
          <td>{{ order.food_info }}</td>
          <td>{{ order.food_price}} 원 </td>
          <td> 
            <button>추가</button>
          </td>
          <td> 
            <button>삭제</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- {{ order[0][0].qunatity}} -->
    </div>
  </div>
</template>

<script>
import { mapState  } from 'vuex'

export default {
  computed: {
    ...mapState('food', [ 
      "order"
    ]),

  }
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
    text-align: center;

    th, td {  
      padding: 8px;
      border: 1px solid #ccc;
    }
    
  }
 
}

</style>