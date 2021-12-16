<template>
  <div class="container">
    <div class="inner">
      <div class="user_info">
        <div class="user">
          <el-avatar> user </el-avatar>
        </div>
        <div class="user">
        <p>{{ reviewInfo.users_user_id}}</p>
        </div>
      </div>
      <div class="image-box">
        <img v-if="reviewInfo.comments_image !== this.nullImage"
          :src="reviewInfo.comments_image" />
      </div>
      <div class="user_text">
        <p>{{ reviewInfo.comments_text}}</p>
      </div>
      <div>{{deleteMessage}}</div>
      <div class="btn-group">
        <el-button 
          type="text" 
          @click="deleteComment()">삭제
        </el-button>
        <el-button 
         type="text"
         @click="modifyComment()">
         수정
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      reviewInfo: '',
      deleteMessage:"",
      nullImage: "",
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
    axios.get('http://localhost:3000/api/admin/get/nullImage')
    .then(res => {
      console.log("null", res.data)
      this.nullImage = res.data[0].null_image
    })
  },
  methods: {
    modifyComment() {
      var id = this.$route.params.id; 
      console.log("id", id);
      this.$router.push('modify/' + id)
    },
    deleteComment() {
      var id = this.$route.params.id; 
      console.log("id", id);
      axios.get('http://localhost:3000/api/user/delete/comment/' + id)
      .then(({data},) => {
        console.log("성공", data)
        this.deleteMessage = "삭제됐습니다."
        setTimeout(() => {
          this.$router.push('/user/board')
        },2000)
      })
      .catch(err => {
        console.error("실패", err)
      })
    }
  },
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

    p {
      font-weight: 600;
    }
  }
}

.user_text {
  padding: 5px;
  width: 100%;
  min-height: 150px;
}


img {
  width: 370px;
  height: 300px;
}
</style>