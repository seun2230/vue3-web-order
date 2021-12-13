<template>
  <div class="container">
    <div class="inner">
      <div class="inner__img">
        <img 
          :src="comment.comments_image"
          width="100"
          height="100" />
      </div>
      <div class="inner_info">
        <div class="info_id" 
          id="info_id" >
          {{ comment.users_user_id }}
        </div>
        {{ comment.comments_title}}
        {{ comment.comments_text }}
        {{ comment.comments_rating}}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    comment: {
      type: Object,
      default: function() { return {} }
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}
</style>