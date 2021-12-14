<template>
  <div>
    <h1>헤이픽 리뷰</h1>
    <ReBoardItem
      v-for="comment in comments"
      :key="comment.food_items_food_id"
      :comment="comment" />
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
    ...mapState('comment', ['comments'])
  }
}
</script>

<style>

</style>