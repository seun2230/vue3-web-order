<template>
  <div class="container">
    <div class="inner">
      <div class="user_info">
        <div class="user">
          <el-avatar> user </el-avatar>
        </div>
        <div class="user">
        {{ reviewInfo.users_user_id}}
        </div>
      </div>
      <div class="user_img">
        <img 
          :src="reviewInfo.comments_image" />
      </div>
      <div class="user_text">
        {{ reviewInfo.comments_text}}
      </div>

      <div class="btn-group">
        <button>+</button>
        <button>-</button>
        <button>x</button>
      </div>
    </div>
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
    axios.get('http://localhost:3000/api/user/get/comment/' + id)
    .then(res => {
      console.log("성공", res.data)
      this.reviewInfo = res.data[0]
    })
    .catch(err => {
      console.error("실패", err)
    })
  }
}
</script>

<style scoped lang="scss">
.container {
  border: 2px solid rgba(110, 108, 108, 0.329);
}
.user_info {
  display: flex;
  align-items: center; 
  .user {
    padding: 5px;
  }
}

img {
  width: 370px;
  height: 300px;
}
</style>