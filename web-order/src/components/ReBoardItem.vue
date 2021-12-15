<template>
  <router-link 
    :to="{name: 'show', params: { id: comment.comments_id }}">
    <div class="container">
      <div class="inner">
        <div class="inner__img">
          <img 
            :src="comment.comments_image"
            width="100"
            height="100" />
        </div>
        <div class="inner_info">

          {{ comment.users_user_id }}
          {{ comment.ratings}}
          <p>{{ comment.comments_title}}</p>
          <div class="info_text">
          {{ comment.comments_text }}
          <el-button style="small">
            <i class="fas fa-caret-down"></i>
            더보기
          </el-button>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      default: function() { return {} }
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.container {
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 10px;

  .inner {
    display: flex;
    align-items: center;
   
    img {
      border-radius: 10px;
    }
  }
}

.info_text {
  border: 2px solid navajowhite;
  display: -webkit-box;
  word-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  // text가 많은 경우 생략 기호 보여주기
  text-overflow: ellipsis;
}


</style>