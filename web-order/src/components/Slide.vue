<template>
  <div class="block">
    <el-carousel
      height="45vh" >
      <el-carousel-item 
        v-for="item in slide" 
        :key="item">
          <div class="img-box">
            <img 
              :src="item.slide_image"
              :alt="item.slide_image" />
          </div>
      </el-carousel-item>
    </el-carousel>
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
.block {
  margin: 10px;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
}
img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: fill;
}
.img-box {
  width: 100%;
  height: 100%;
}

@media screen and (min-width: 767px) {
  .block, .el-carousel__container, .img-box  {
    height: 600px;
  }
}
</style>
