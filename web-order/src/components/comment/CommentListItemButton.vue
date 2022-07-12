<template>
  <div>
    <div class="button-section">
      <div
        v-if="!likeBtn"
        class="text"
        @click="likeButton()">
        <i class="far fa-thumbs-up"></i>
        {{ likeUser.length }}
      </div>
      <div
        @click="dislikeButton()">
        <i class="far fa-comment-dots"></i> 
        {{ likeUser.length }}
      </div>
      <div
        @click="clickReply()">
        <i class="far fa-comment-dots"></i> 
        <span>
          {{ replys.length }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapGetters } from 'vuex';

export default {
  created() {
    let id = this.comment.comments_id;
    console.log("id", id);
    this.$store.commit('user/getLikeUserList', id);
  },
  props: {
    comment: {
      type: Object,
      default: function() { return {} },
      required: true,
    },
  },
  computed: { 
    ...mapState('user', ['likeUser']),
    ...mapState('reply', ['replys']),
    ...mapGetters('user', ['likeBtn']),
  },
  methods: {
    likeButton() {
      let id = this.comment.comments_id;
      console.log("commentListItem id", id);

      axios.post(`${process.env.VUE_APP_URL}/api/user/post/likeUp/` + id)
      .then(res => {
        console.log("likeBtn response success", res.data);
        alert('좋아요 버튼을 누르셨습니다.');
        this.$router.go();
      })
      .catch(err => {
        console.log("likeBtn response fail", err.response);
      })
    },
    dislikeButton() {
      const id = this.comment.comments_id;
      axios.post(`${process.env.VUE_APP_URL}/api/user/post/likeDown/` + id)
      .then(res => {
        console.log("dislikeBtn response success", res.data);
        alert('싫어요 버튼을 누르셨습니다.');
        this.$router.go();
      })
      .catch(err => {
        console.log("dislikeBtn response fail", err.response);
      })
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/scss/btn.scss';
@import '@/scss/common.scss';
.button-section {
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;
  color: $gray-500;
}
</style>
