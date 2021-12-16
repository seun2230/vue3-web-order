<template>
  <router-link 
    :to="{name: 'boardItem', params: { id: comment.comments_id }}">
    <div class="container">
    <img 
      :src="comment.comments_image"
      :alt="comment.comments_id" />
      <div class="infos">
        <div class="title">
          <span>{{ comment.comments_title }}</span>
        </div>
        <div class="ratings">
          <span>{{ comment.comments_ratings }}</span>
        </div>
        <div class="text">
          <span>{{ comment.comments_text }}</span>
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
      default: function() { return {} },
      required: true,
    },
  },
  methods: {

  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
@import '../scss/variables.scss';

img {
  border-radius: 10px;
  width: 100px;
  height: 100px;
}
span {
  overflow: hidden;
  text-overflow: ellipsis;
}
.container {
  padding: 10px;
  display:flex;
  width: 100%;
  border-radius: 5px;
  height : 120px;
  background-color: $menuListBg;
  .infos {
    .title {
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .text {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

.info_text {
  border: 2px solid navajowhite;
  display: -webkit-box;
  word-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  // text가 많은 경우 생략 기호 보여주기
  overflow: hidden;
  text-overflow: ellipsis;
}


</style>