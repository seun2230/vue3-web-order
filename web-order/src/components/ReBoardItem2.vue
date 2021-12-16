<template>
  <div class="container">
    <img
      src="https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/66FB/image/f8zuhswPGHoGlOL4gcFS4yQOyHk.jpeg" 
      alt="food.food_name" />
    <div class="infos">
      <div class="name">
        제목ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
      </div>
      <div class="price">
        <span>내용</span>
      </div>
      <div class="button">
        <span>평점</span>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  props: {
    food: {
      type: Object,
      default: function() { return {} }
    }
  },
  methods: {
    addCart() {
      this.$store.dispatch('food/addCart', this.food)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables.scss';
@import '../scss/btn.scss';

.container {
  padding: 10px;
  display: flex;
  width:100%;
  height:120px;
  background-color: $menuListBg;
  img {
    border-radius: 9px;
    height: 100px;
    width: 100px;
    opacity: 1;
  }
  .infos {
    margin-left: 5px;
    padding: 10px;
    border-radius: 9px;
    background-color: $menuListCnt;
    border-radius: 9px;
    width: 100%;
    text-align: center;
    font-weight: 800;
    color: $menuBg;
    .name {
      display: flex;
      justify-items: center;
      width: 100%;
      height: 20px;
      margin-bottom: 3px;
      border-radius: 9px;
      word-wrap: break-word;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .price {
      display: flex;
      justify-content: center;
      height: 25px;
      border-radius: 9px;
      margin-bottom: 3px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .button {
      display: flex;
      height: 25px;
      border-radius: 9px;
      color: #ff7b7b9a;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    span {
      width: 100%;
    }
  }
}
</style>