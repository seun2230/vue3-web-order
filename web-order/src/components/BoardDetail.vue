<template>
  <div class="container">
    <div class="inner">
      <div class="user_info">
        <div class="user">
          <el-avatar> {{ reviewInfo.comments_user_id }} </el-avatar>
        </div>
        <div class="user">
          <!-- <p>{{ translatedId}}</p> -->
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
        <span>메뉴 : {{ reviewInfo.food_name}}</span>
      </div>
      <div class="keyword-hidden" id="hidden" @click="clickHidden()">
        <div class="keyword" 
          v-for="keyword in keywords"
          :key="keyword.id_keyword">
          <span class="keyword-text">{{ keyword.keyword }}</span>
        </div>
      </div>
      <div class="user_text">
        <p>{{ reviewInfo.comments_text}}</p>
      </div>    
      <div class="user-click">
        <div v-if="!likeBtn" class="like-btn">
          <p @click="clickLike()"><i class="far fa-thumbs-up fa-2x"></i>{{ this.likeUser.length }}</p>
        </div>
        <div v-else class="unlike-btn">
          <p @click="deleteLike()" style="color: red"><i class="far fa-thumbs-up fa-2x"></i>{{ this.likeUser.length }}</p>
        </div>        
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
import { mapState, mapGetters } from 'vuex';
import ReplyList from './ReplyList.vue';
import axios from 'axios';

export default {
  data() {
    return {
      show: '',
      reviewInfo: '',
      deleteMessage:"",
      nullImage: "",
      textarea: '',
      reply: [],
      keywords: []
    }
  },
  created() {
    const id = this.$route.params.id;
    this.$store.commit('user/getLikeUserList', id)
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
     axios.get(`${process.env.VUE_APP_URL}/api/user/get/keyword/` + id)
    .then(res => {
      console.log("keyword", res.data)
      this.keywords = res.data
    })
    .catch(err => {
      console.log("err", err);
    }) 
  },
  computed: {
    ...mapState('user', ['likeUser']),
    ...mapGetters('user', ['likeBtn']),
  },
  methods: {
    clickHidden() {
      let x = document.getElementById('hidden');
      x.style.height = "150px";
    },
    clickLike() {
      const id = this.$route.params.id;
      axios.post(`${process.env.VUE_APP_URL}/api/user/post/likeUp/` + id)
      .then(res => {
        console.log("server response", res.data);
        this.$router.go()
      })
      .catch(err => {
        console.log("err", err);
      })
    },
    deleteLike() {
      console.log("clicked!")
      const id = this.$route.params.id;
      axios.post(`${process.env.VUE_APP_URL}/api/user/post/likeDown/` + id)
      .then(res => {
        console.log("server response", res.data);
        this.$router.go();
      })
      .catch(err => {
        console.log("err", err);
      })
    },
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
.keyword-hidden {
    height: 33px;
    overflow: hidden;
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
  text-align: center;
  width: auto;
  height: 30px;
  padding: 10px;
  background-color: rgb(236, 230, 230);
  box-shadow: 0 4px 2px -4px black;
  border-radius: .3rem;
  font-size: 15px;
  margin-right: 5px;
  margin-bottom: 5px;
  
  p {
    margin: 0px;
    padding: 0px;
  }
}
.keyword {
  display: inline-block;
  text-align: center;
  height: 30px;
  width: auto;
  background:rgb(248, 248, 248);
  border: 1px solid rgb(235, 233, 233);
  border-radius: .3rem;
  padding: 10px;
  box-shadow: 0 4px 2px -4px black;
  margin-right: 5px;
  margin-bottom: 5px;
}


img {
  border-radius: .4rem;
  width: 100%;
  height: 100%;
}
.el-input-group__prepend {
  background-color: #ffffff;
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