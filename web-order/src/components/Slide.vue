<template>
<div class="slide-text">
  <div class="text">
  <div class="main-text">
    CHIRSTMAS EVENT
  </div>
  <div class="sub-text">
    시즌메뉴 주문 시 음료 무료 증정
  </div>
  </div>
  <div class="block">
    <el-carousel
      height="50vh" >
      <el-carousel-item
        v-for="item in slide"
        :key="item">
            <img
              :src="item.slide_image"
              :alt="item.slide_image" />
      </el-carousel-item>
    </el-carousel>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  methods: {

  },
  created() {
    this.$store.commit('admin/getSlide');
  },
  computed: {
    ...mapState('admin',['slide'])
  }

}
</script>
<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media screen and (min-width: 767px) {
  img {
    height: 512px;
  }
  .block {
    height: 512px;
    background-color: black;
  }
}

@media screen and (min-width: 1023px) {
    img {
    height: 683px;
  }
  .block {
    height: 683px;
    background-color: black;
  }
}

.slide-text {
  // display: flex;
  // flex-direction: column;
  // position: relative;
  width: 100vw;
  height: 50vh;
  background-color: rgba(255, 255, 255, 0.0000000001);
  opacity: 1;
}

.block {
  position: absolute;
  height: 100px;
  width: 100vw;
}

.text {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100vw;
  height: 50vh;
}

.main-text {
  position: absolute;
  color: black;
  font-size: 3rem;
  padding: 10px 10px 40px 10px;
}

.sub-text {
  position: absolute;
  color: black;
  padding: 5px 10px 15px 10px;
}
</style>
