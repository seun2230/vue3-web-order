<template>
  <div>
    <div v-for="(comment, i) in comments"
      :key="comment.comment_food_id" >
      {{ comments[i].comments_id }}
      {{ comments[i].comments_title}}
      {{ comments[i].comments_image}}
      {{ comments[i].comments_text }}

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  created() {
    this.$store.commit('comment/getState')
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapState('comment', ['comments'])
  }
}
</script>

<style>

</style>