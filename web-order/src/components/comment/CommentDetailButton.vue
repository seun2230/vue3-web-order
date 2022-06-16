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
        <span>도움됐어요</span>       
      </div>
    </div>
    <div
      class="btn">
      <i class="far fa-comment-dots"></i>
      {{ likeUser.length }}
    </div>
    <div>
      <span @click="show = !show">
        <i class="far fa-comment-dots"></i>
      </span> 
      <p v-if="!show">
        <!-- <CommentDetailModal
          @close="modal = !modal"
          v-if="modal" /> -->
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
// import CommentDetailModal from '../comment/CommentDetailModal.vue';
import { mapState, mapGetters } from 'vuex';

export default {
  // components: {
  //   CommentDetailModal
  // },
  data() {
    return {
      show: true,
      modal: true
    }
  },
  created() {
    const id = this.$route.params.id;
    // const id = this.comment.comments_id;
    console.log("id check", id);
    this.$store.commit('user/getLikeUserList', id);
  },
  computed: {
    ...mapState('user', ['likeUser']),   
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

</style>