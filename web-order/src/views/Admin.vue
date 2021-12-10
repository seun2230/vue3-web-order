<template>
<div>
   <h1>
    관리자 페이지임
  </h1>
  
  <ImageUpload/>
  <OrderList />
</div>
</template>

<script>
import ImageUpload from '../components/ImageUpload.vue'
import OrderList from '../components/OrderList.vue'

export default {
  components: {
    ImageUpload,
    OrderList
  }
}
</script>