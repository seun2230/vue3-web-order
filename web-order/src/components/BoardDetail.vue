<template>
  <div>
    {{ reviewInfo }}
    <img :src="reviewInfo.comments_image" 
      :alt="reviewInfo.comments_id" />
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      reviewInfo: ''
    }
  },
  created() {
    var id = this.$route.params.id;
    console.log("id", id);
    axios.get(`${process.env.VUE_APP_URL}/api/user/get/comment/` + id)
    .then(res => {
      this.reviewInfo = res.data[0]
    })
    .catch(err => {
      console.error("실패", err)
    })
  }
}
</script>

<style>

</style>