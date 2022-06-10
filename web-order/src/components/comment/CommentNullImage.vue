<template>
  <div>
    <el-carousel 
      height="320px"
      :interval="8000"
      arrow="always">
      <el-carousel-item 
        v-if="myComment.comments_image1 !== null">
        <img
          v-if="myComment.comments_image !== nullImages.null_image 
            || myComment.comments_image !== null"
          :src="myComment.comments_image" />
      </el-carousel-item>
      <el-carousel-item 
        v-if="myComment.comments_image2 !== null">
        <img
          v-if="myComment.comments_image2 !== nullImages.null_image 
            || myComment.comments_image2 !== null"
          :src="myComment.comments_image2" />
      </el-carousel-item>
      <el-carousel-item 
        v-if="myComment.comments_image3 !== null">
        <img
          v-if="myComment.comments_image3 !== nullImages.null_image"
          :src="myComment.comments_image3" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>


<script>
import { mapState } from 'vuex';
export default {
  props: {
    myComment: {
      type: Object,
      default: function() { return {} },
      required: true,
    },
  },
  created() {
    const id = this.$route.params.id;
    console.log(id);
    this.$store.commit("admin/getNullImage", id);
  },
  computed: {
    ...mapState('admin', ['nullImages'])
  }
}
</script>

<style scoped>
img {
  width: 100%;
  height: 100%; 
  border-radius: .5rem;
}
</style>
