<template>
  <div class="infos">
    <div class="name">
      {{ order.food_name }}
    </div>
    <div class="quantity">
      {{ order.order_quantity }}
    </div>
    <div class="status">
      {{ order.order_status }}
    </div>
    <button 
      class="modify-btn"
      @click="modifyStatus(this.order)">
      준비완료
    </button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    order: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  methods: {
    modifyStatus(num) {      
        axios.post('http://localhost:3000/order/status', 
        JSON.stringify(num),
            {
              headers: {
                "Content-Type": "application/json"
              },
              withCredentials: true
            })
        .then((res) => {
          console.log("order load Success", res)
        })
        .catch((err) => {
          console.log(err)
        })
      
    }
  } 
}
</script>