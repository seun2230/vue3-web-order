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
      <div class="user_order">
       주문 메뉴 {{ reviewInfo.food_name}}
      </div>
      <div class="user_text">
        <p>{{ reviewInfo.comments_text}}</p>
      </div>
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
    <hr />
    <div>
      <form>
        <div class="form-group">
          <label>댓글</label>
          <el-input
              v-model="textarea"
              maxlength="50"
              placeholder="댓글 달기 ..."
              show-word-limit
              type="textarea" />
        </div>
        <ReplyList
          v-for="reply in reply"
         :reply="reply"
         :key="reply.id_reply" />
        <div class="btn-submit">
        <el-button 
          type="text"
          @click="writeReply()">등록</el-button>
        </div>
    </form>
    </div>
  </div>
</template>

<script>
import ReplyList from './ReplyList.vue'
import axios from 'axios'
export default {
  data() {
    return {
      reviewInfo: '',
      deleteMessage:"",
      nullImage: "",
      textarea: '',
      reply: []
    }
  },
  created() {
    const id = this.$route.params.id;
    console.log("id", id);
    axios.get(`${process.env.VUE_APP_URL}/api/user/get/comment/` + id)
    .then(res => {
      console.log("성공", res.data)
      this.reviewInfo = res.data[0]
    })
    .catch(err => {
      console.error("실패", err)
    })
    axios.get(`${process.env.VUE_APP_URL}/api/admin/get/nullImage`)
    .then(res => {
      console.log("null", res.data)
      this.nullImage = res.data[0].null_image
    })

    axios.get(`${process.env.VUE_APP_URL}/api/user/get/reply/` + id)
    .then(res => {
      console.log("reply", res.data)
      this.reply = res.data
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
      axios.get(`${process.env.VUE_APP_URL}/api/user/delete/comment/` + id)
      .then(({data}) => {
        console.log("성공", data)
        this.deleteMessage = "삭제됐습니다."
        setTimeout(() => {
          this.$router.push('/user/board')
        },2000)
      })
      .catch(err => {
        console.error("실패", err)
      })
    },
    writeReply() {

      const id = this.$route.params.id;
      const foodId =  this.reviewInfo.food_id;
      const text = this.textarea;
      let data = [{"food_id":foodId,
        "comment_text": text}]
      console.log("review", data)
      axios.post(`${process.env.VUE_APP_URL}/api/user/reply/` + id,
      JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(({data}) => {
        console.log("data success!", data);
      })
      .catch(err => {
        console.log("data fail", err);
      })
    },
  },
  components: {
    ReplyList,
  }
}
</script>

<style scoped lang="scss">

.inner {
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
.user_order {
  width: 120px;
  padding: 5px; 
  background-color: rgb(247, 239, 239);

  border-radius: 2rem;
  font-size: 15px;
}
.user_text {
  padding: 5px;
  width: 100%;
  min-height: 150px;
}

.btn-submit {
  position: absolute;
  bottom: -30px;
  right: 10px;
}

img {
  width: 370px;
  height: 300px;
}

</style>