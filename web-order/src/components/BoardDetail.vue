<template>
  <div>
    {{ reviewInfo }}
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      reviewInfo: []
    }
  },
  created() {
    var id = this.$route.params.id;
    console.log("id", id);
    axios.get('http://localhost:3000/user/comments/get/' + id)
    .then(res => {
      console.log("성공", res.data)
      this.reviewInfo = res.data
    })
    .catch(err => {
      console.error("실패", err)
    })
  }
}
</script>

<style>

</style>