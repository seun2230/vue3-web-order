<template>
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
  object-fit: fill;
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
</style>
