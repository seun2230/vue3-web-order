<template>
  <div class="btn-container">
    <div class="btn">
      <div 
        v-if="!likeBtn" 
        class="btn--like"
        @click="likeButton()">
        <i class="far fa-thumbs-up"></i>
        <span class="btn__text">도움돼요</span>
      </div>
      <div 
        v-else 
        @click="dislikeButton()">
        <i class="far fa-thumbs-up"></i> 
        <span>
          {{ likeUser.length }}
          도움됐어요
        </span>       
      </div>
    </div>
    <div
      class="btn"
      @click="showReply()">
      <i class="far fa-comment-dots"></i>
      {{ this.reply }}
    </div>
    <form v-if="!show">
      <div class="form_group">
        <input 
          type="text" 
          class="input-reply" 
          v-model="textarea" 
          placeholder="댓글을 입력하세요." />
        <!-- <button
          type="text"
          class="btn-reply"
          @click="writeReply()">
          등록
        </button> -->
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      show: '',
      textarea: '',
      modal: true
    }
  },
  created() {
    const id = this.$route.params.id;
    console.log("id check", id);
    this.$store.commit('user/getLikeUserList', id);
    this.$store.commit('comment/getReply', id);
  },
  computed: {
    ...mapState('user', ['likeUser']),   
    ...mapState('comment', ['Reply']),
    ...mapGetters('user', ['likeBtn']),
  
  },
  methods: {
    likeButton() {
      const id = this.$route.params.id;
      axios.post(`${process.env.VUE_APP_URL}/api/user/post/likeUp/` + id)
      .then(res => {
        console.log("server response", res.data);
        this.$router.go();
      })
      .catch(err => {
        console.log("err", err);
      })
    },
    dislikeButton() {
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
    showReply() {
      this.show = true;
    },
  }
}
</script>

<style scoped>
svg {
  color: #ccc;
}

.btn-container {
  display: inline-flex;
}
.btn {
  margin-right: 20px;
  color: #ccc;
  transition-duration: .3s;
}
.btn__text {
  margin: 5px;
}

.form_group {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 10px;
  /* background-color: pink; */
  position: absolute;
  left: 0;
  bottom: 100px;
  /* top: ; */
}

.input-reply { 
  border: 1px solid #ccc;
  border-radius: .5rem;
  padding: 10px;
  width: 100%;
  height: 50px;
  /* height: 40%; */
  /* margin-right: 100px; */
}

.btn-reply {
  padding: .2rem;
  /* margin-top: 10px; */
  width: 20%;
  box-sizing: border-box;
  outline: none;
  font-size: 16px;
  font-weight: bold;
  transition: .5s;
  border-radius: .5rem;
  border: 1px solid #eca115;
  background-color: #fff;
  color: #eca115;
}
</style>