<template>
 <div class="container">
    <div class="menu_new">
      <h1>{{ title }}</h1>
    </div>
    <swiper 
    :slidesPerView="3"
    :spaceBetween="30" 
    :pagination='{"clickable": true }' 
    class="mySwiper">
    <swiper-slide  v-for="food in foods" 
      :key="food.food_name"
      :food="food">
      <div class="menu__list">
        <img 
          :src="`${food.food_image1}`" />
        <p>{{ food.food_name}}/</p>
        <p>{{ food.food_price}}</p>
      <i class="fas fa-heart"></i>
      </div>
    </swiper-slide>
  </swiper>
</div>
</template>

<script>

import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.min.css'


import SwiperCore, {
  Pagination
} from 'swiper';

// install Swiper modules
SwiperCore.use([Pagination]);

import { mapState } from 'vuex'
export default {
  data() {
    return {
      title: 'New Menu'
    }
  },
  components: {
    Swiper,
    SwiperSlide,
  },
 computed: {
    ...mapState('food', [
        'foods'
    ])
  } 
  
  
}
</script>

<style scoped lang="scss">
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;

  .menu__list {
    max-width: 100%;
    height: 350px;
    background-color: green;
  }
}


/* .swiper-slide img {
  display: none;
  width: 100%;
  height: 100%;
} */
</style>