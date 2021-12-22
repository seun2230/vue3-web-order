<template>
  <div class="container">
    <div class="inner">
      <div class="user_info">
        <div class="user">
          <el-avatar> {{ reviewInfo.comments_user_id }} </el-avatar>
        </div>
        <div class="user">
          <p>{{ reviewInfo.comments_user_id}}</p>
          <div class="ratings">
            <div 
              class="ratings-fill"
              :style="{ width: reviewInfo.ratings * 20 + '%' }">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <div class="ratings-before">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
          </div>
            <span class="user_date">{{ reviewInfo.comments_date  }}</span>
        </div>
      </div>
      <img 
        v-if="reviewInfo.comments_image !== this.nullImage"
        :src="reviewInfo.comments_image" />
      <div class="user_order">
       {{ reviewInfo.food_name}}
      </div>
      <div class="user_text">
        <p>{{ reviewInfo.comments_text}}</p>
      </div>
      <div class="user-click">
        <p><i class="far fa-thumbs-up fa-2x"></i>{{ 17 }}</p>
        <p @click="clickReply()"><i class="far fa-comment-dots fa-2x"></i> {{ reply.length }}</p>
      </div>
      <div class="btn_group">
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
    <form v-if="show">
      <div class="form_group">
        <el-input
          style="border-radius: 5rem"
          v-model="textarea"
          maxlength="50"
          placeholder="댓글 달기 ..."
          show-word-limited
          type="text">
          <template #append
             style="text-align: center">
            <el-button 
              type="text"
              class="btn_write"
              @click="writeReply()">등록</el-button>
          </template>
        </el-input>
      </div>
      <ReplyList
        v-for="reply in reply"
        :reply="reply"
        :key="reply.id_reply" />
    </form>
  </div>
</template>

<script>
import ReplyList from './ReplyList.vue'
import axios from 'axios'
export default {
  data() {
    return {
      show: '',
      reviewInfo: '',
      deleteMessage:"",
      nullImage: "",
      textarea: '',
      reply: [],
    }
  },
  created() {
    const id = this.$route.params.id;
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
  computed: {
    
  },
  methods: {
    clickReply() {
      this.show = true;
    },
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
    ratingToPercent() {
      const score = this.reviewInfo.ratings;
      console.log(score);
      return score * 20;
    },
  },
  components: {
    ReplyList,
  }
}
</script>

<style scoped lang="scss">
.container {
  top: 40px;
  width: 100%;
  .inner {
    border: 2px solid rgba(247, 246, 246, 0.562);
    padding: 10px;
    width: 100%;
    display: inline-block;
    .image-box {
      justify-content: center;
    }
    .user_info {
      display: flex;
      align-items: center; 
      .user {
        padding: 5px;
        p {
          margin: 0px;
          font-weight: 600;
        }
        .user_date {
          color:rgb(138, 134, 134);
          position: absolute;
          top: 70px;
          right: 20px;

        }
      }
    }

  }
}
.user-click {
  display: flex;
  align-items: center;
  padding-right: 10px;

  p {
    margin: 0px;
    padding: 10px;
  }
}
.user_text {
  width: 100%;
  min-height: 50px;
}
.user_order {
  display: inline-block;
  width: auto;
  padding: 5px; 
  background-color: rgb(236, 230, 230);
  border-radius: 2rem;
  font-size: 15px;
}

img {
  border-radius: .4rem;
  width: 350px;
  height: 300px;
}

.ratings {
  display: inline-block;
  position: relative;
  unicode-bidi: bidi-override;
  width: max-content;
  -webkit-text-fill-color: transparent; 
  -webkit-text-stroke-width: 1.3px;
  -webkit-text-stroke-color: rgba(255, 255, 255, 0.322);
}
 
.ratings-fill {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  overflow: hidden;
  -webkit-text-fill-color: rgba(245, 148, 22, 0.842);
}
</style>