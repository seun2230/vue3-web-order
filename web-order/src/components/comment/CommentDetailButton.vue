<template>
  <div>
    <div class="btn">
      <div 
        v-if="!likeBtn" 
        class="btn--like"
        @click="likeButton()">
        <i class="far fa-thumbs-up"></i>
        <span class="btn__text">도움되요</span>
      </div>
      <div 
        v-else 
        class="btn--unlike"
        @click="dislikeButton()">
        <i class="far fa-thumbs-up"></i>        
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapGetters } from 'vuex';
export default {
  created() {
    const id = this.$route.params.id;
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
/* .btn__text {
  padding: 5px;
  color: #ccc;
} */

.btn {
  color: #ccc;
  transition-duration: .3s;
}

.btn__text {
  margin: 5px;
}

</style>