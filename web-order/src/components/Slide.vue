<template>
  <div class="block">
    <el-carousel height="200px">
      <el-carousel-item 
        v-for="item in slide" 
        :key="item">
        <img 
          :src="item.slide_image"
          :alt="item.slide_image" />
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
img {
  object-fit: cover;
}
</style>

