<template>
  <router-link class="container-exterrior"
    :to="{name: 'boardItem', params: { id: comment.comments_id }}">
    <div class="container">
    <img 
      :src="comment.comments_image"
      :alt="comment.comments_id" />
      <div class="infos">
        <div class="title-box">
          <h3 class="title">{{ comment.comments_title }}</h3>
        </div>
        <div class="ratings-box">
          <span class="ratings">{{ comment.comments_ratings }}</span>
        </div>
        <div class="text-box">
          <span class="text">{{ comment.comments_text }}</span>
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
  border-radius: 5px;
  width: 100px;
  height: 100px;
}
span {
  overflow: hidden;
  text-overflow: ellipsis;
}
.container {
  width: 100%;
  height : 20vh;
  padding: 10px;
  display: flex;
  border-radius: 3px;
  border: 1px solid lightgrey;
  box-shadow: 0 4px 4px -4px rgb(197, 193, 193);
  .infos {
    .title {
      overflow: hidden;
      text-overflow: ellipsis;
      color: rgba(223, 187, 187, 0.918);
    }
    .text {
      display: -webkit-box;
      word-wrap: break-word;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      // text가 많은 경우 생략 기호 보여주기
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

// .info_text {
//   border: 2px solid navajowhite;
//   display: -webkit-box;
//   word-wrap: break-word;
//   -webkit-line-clamp: 2;
//   -webkit-box-orient: vertical;
//   // text가 많은 경우 생략 기호 보여주기
//   overflow: hidden;
//   text-overflow: ellipsis;
// }


</style>