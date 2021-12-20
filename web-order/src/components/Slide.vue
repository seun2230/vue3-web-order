<template>
  <div class="block">
    <el-carousel
      height="350px" >
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
  margin-bottom: 5px;
}
img {
  width: 100%;
  height: 100%;
  object-fit: fill;
}
.img-box {
  width: 100%;
  height: 100%;
}
</style>

