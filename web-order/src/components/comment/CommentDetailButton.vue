<template>
  <div class="btn-container">
    <div class="btn">
      <div 
        v-if="!likeBtn" 
        @click="likeButton()">
        <i class="far fa-thumbs-up"></i>
        <span>
          {{ likeUser.length }}  
        </span>
        추천해요
      </div>
      <div 
        v-else 
        :class="{'btn-dislike': isActive}"
        @click="dislikeButton()">
        <i class="far fa-thumbs-up"></i> 
        <span>
          {{ likeUser.length }}
        </span>
        명에게 도움이 됐어요       
      </div>
    </div>
    <div
      class="btn"
      @click="showReply()">
      <i class="far fa-comment-dots"></i>
      {{ replys.length }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapGetters } from 'vuex';

export default {
  props: {
    myComment: {
      type: Object,
      default: function() { return {} },
      required: true,
    },
  },
  data() {
    return {
      isActive: true,
      modal: true
    }
  },
  created() {
    const id = this.$route.params.id;
    this.$store.commit('user/getLikeUserList', id);
  },
  computed: {
    ...mapState('user', ['likeUser']),   
    ...mapState('comment', ['replys']),
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

.btn-dislike {
  color: #f33c5a;
}
</style>