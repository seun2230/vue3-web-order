<template>
    <el-carousel 
      height="300px" 
      direction="vertical"
      :autoplay="true">
    <el-carousel-item 
      v-for="food in foods" 
      :key="food.food_name"
      :food="food">
          
        <div class="menu_img">
            <img 
          :src="`${food.food_image3}`" />
        </div>
        <p>{{ food.food_name}}</p>
        <p>{{ food.food_price}}원</p>
        <li><i class="fas fa-heart"></i></li>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import { mapState } from 'vuex'
export default {

  computed: {
    ...mapState('food', ['foods'])
  }
}
</script>

<style socped lang="scss">

.el-carousel__item p {
  color: #e8e9eb;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
 img {
  position: relative;
  margin-bottom: 20px;
  object-fit: fill;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
}

.menu__img  {
  width: 100%;
  .image {
    max-width: 100%;
    height: auto;
  }
}
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

</style>