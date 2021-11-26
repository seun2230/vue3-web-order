<template>
  <div class="container">
    <div class="inner">
      <h2>주문 현황</h2>
      <div class="date">
        <input type="date" id="startDate" @change="test(this)"/> 
            ~
        <input type="date" id="endDate" /> 
        <input type="submit" value="search" @click="searchInfo()" />
      </div>
    <table class="table-list">
      <thread>
      <tr>
        <th>주문 번호</th>
        <th>사용자ID</th>
        <th>주문 날짜</th>
        <th>메뉴 이름</th>
        <th>주문 수량</th>
        <th>주문 상태</th>
        <th>총 가격</th>
      </tr>
      </thread>
      <tbody>
        <tr 
          v-for="(order) in order" 
          :key="order.id_order_list">
          <td>{{ order.id_order_list}}</td>
          <td>{{ order.users_user_id }}</td>
          <td>{{ order.order_date}}</td>
          <td>{{ order.food_name }}</td>
          <td>{{ order.order_quantity }}</td>
          <td>{{ order.order_status }}</td>
          <td>{{ order.order_total_price}} 원 </td>
          <td> 
            <button>추가</button>
          </td>
          <td> 
            <button>삭제</button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import { mapState  } from 'vuex'

export default {
  computed: {
    ...mapState('food', [ 
      "order"
    ]),

  },
  
  methods: {
      searchInfo() {
        let startDate = document.getElementById("startDate").value;
        let endDate = document.getElementById("endDate").value;
        
        
        let orderDate = [ startDate, endDate];
        console.log(orderDate);
        axios.post('http://localhost:3000/orderDate', JSON.stringify(orderDate),
          {
            headers: {
              "Content-Type": "application/json"
            }
          })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
      
      // event.preventDefault();
      // 기본 태그의 이벤트 속성을 제한하는 메서드
      
    },
    test(object) {
      console.log(object.value);
    }
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