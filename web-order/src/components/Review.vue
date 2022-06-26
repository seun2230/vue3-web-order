<template>
  <div class="container">
    <div class="inner">
      <div class="user">
        <span class="user__list">
          {{ getUserName }}님
        </span> 주문하신 
        <span>
          {{ orderList[0].food_name }}
        </span>이 마음에 드셨나요?
      </div>
      <div class="order">
        <span class="order__name">
          {{ orderList[0].food_name }}
        </span>
        주문 가격 : <span>{{ orderList[0].price }}</span>
        주문 날짜 : <span>{{ orderList[0].order_date }}</span>
      </div>
      <div>
        <CommentRating 
          @child="saveRating" />
      </div>
      <div>
        상품 작성란
      </div>
      <div>
        상품 옵션
      </div>
      <div>
        상품 이미지 업로드
      </div>
      <div>
        리뷰 전송 버튼 구성 
      </div>
    </div>
  </div>
</template>

<script>
import CommentRating from './comment/CommentRating.vue';
import { mapGetters, mapState } from 'vuex'

export default {
  components: {
    CommentRating
  },
  data() {
    return {
      childRating: []
    }
  },
  created() {
    this.$store.commit("user/getOrderList")
  },
  computed: {
    ...mapGetters('user', ['getUserName']),
    ...mapState('user', ['orderList']),
  
  },
  methods: {
    saveRating(rating_id) {
      this.childRating = rating_id;
      console.log("parent emit data", this.childRating);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: auto;
  padding: 1rem 1rem;
  border-radius: .25rem;
}
.user {
  margin: 20px 0px;
  .user__list {
  padding: 10 0px;
  color: #5050FF;
  font-size: 20px;
  font-weight: 900;
}
}
.order {
  padding: .5rem;
  display: inline-block;
  display: flex;
  flex-direction: column;
  background-color: #fffdfd;
  box-shadow: 2px 2px 2px #0000001a;
  border-radius: .5rem;
   
  span {
    margin-bottom: 10px;
    font-weight: bold;
  }

  .order__name {
    width: 100px;
    background: linear-gradient(to top, #95ecfc98 50%, transparent 50%);
    align-items: center;
    font-weight: bold;
    transition: .2s all;
  }
}
</style>