<template>
  <div>
    <ReBoardItem
      v-for="comment in comments"
      :key="comment.commets_id"
      :comment="comment" />
    <button @click="writeComment()">등록</button>
    <div v-if="comments.length == 0">
      <p>등록된 리뷰가 없습니다.</p>
    </div>
  </div>
</template>

<script>
import ReBoardItem from './ReBoardItem.vue'
import { mapState } from 'vuex';
export default {
  components: {
    ReBoardItem
  },
  created() {
    this.$store.commit('comment/getState')
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState('comment', [
      'comments'
    ]),
  },
  methods: {
    writeComment() {
      this.$router.push('/user/review');
    },
  },
}
</script>

<style>

</style>