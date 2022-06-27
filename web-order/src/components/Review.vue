<template>
  <div class="container">
    <div class="inner">
      <div class="user">
        <span class="user__list">
          {{ getUserName }}님
        </span> 주문하신 
        <span>
          {{ orderList[0].food_name }}
        </span> 마음에 드셨나요?
      </div>
      <div class="order">
        <span class="order__name">
          {{ orderList[0].food_name }}
        </span>
        주문 가격 : <span>{{ orderList[0].price }}</span>
        주문 날짜 : <span>{{ orderList[0].order_date }}</span>
      </div>
      <div @click="show = !show">
        평점을 작성하세요!
      </div>
      <Transition>
        <p v-if="show">
          <CommentRating 
            @rating="saveRating" />
        </p>
      </Transition>
      <form>
        <div class="keyword">
          키워드 :
          <input 
            type="input"
            v-model="keyword" /> 
        </div>
        <div class="text">
          <span>고객님만의 리뷰를 남겨주세요.</span>
          <textarea 
            v-model="text"
            placeholder="자유롭게 리뷰를 작성해주세요 :)">
          </textarea>
        </div>
        <div class="option">
          <span>리뷰 공개</span>
          <input 
            type="radio" 
            id="status" 
            value="true" 
            v-model="status" />
          <label for="true">공개</label>
          <input 
            type="radio" 
            id="status" 
            value="false" 
            v-model="status" />
          <label for="false">비공개</label>
          {{ this.status }}
        </div>
        <div class="photos">
          <span>사진 업로드</span>
          <CommentImageUpload @child="setData" />
        </div>
        <button
          type="button"
          class="save-button"
          @click="saveComment()">
          리뷰 등록 
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CommentRating from './comment/CommentRating.vue';
import CommentImageUpload from './comment/CommentImageUpload.vue';
import { mapGetters, mapState } from 'vuex';

export default {
  components: {
    CommentRating,
    CommentImageUpload
  },
  data() {
    return {
      childRating: [],
      keyword: [],
      files: [],
      text: '',
      status: '',
      show: ''
    }
  },
  created() {
    this.$store.commit("user/getOrderList"),
    this.$store.commit('food/getState')
  },
  computed: {
    ...mapGetters('user', ['getUserName']),
    ...mapState('user', ['orderList']),
    ...mapState('food', ['foods']),
  },
  methods: {
    saveRating(rating_id) {
      this.childRating = rating_id;
      console.log("parent emit data", this.childRating);
    },
    setData(e) {
      console.log(e);
      this.files = e;
    },
    thisFilesCheck() {
      console.log("this.files", this.file);
    },
    saveComment() {
      console.log("save keywords", this.keywords);
      let formData = new FormData();
      
      for(let i = 0; i < this.files.length; i++) {
        let file = this.files[i].file;
        console.log("save fileList", file);
        formData.append("file", file);
      }

      formData.append("text", this.text);
      formData.append("ratings", this.childRating);
      formData.append("status", this.status);
      formData.append("keyword", this.keyword);
      for (let value of formData.values()) {
        console.log("form value data", value);
      }
      const foodId = this.$route.params.id;
      console.log("foodId", foodId);

      axios.post(`${process.env.VUE_APP_URL}/api/comment/post/comment/` + foodId,
      formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      })
      .then((res) => {
        console.log("saveComment response success", res.data);
        this.$router.push('/user/board');
      })
      .catch((err) => {
        console.error("saveComment response fail", err);
      });
    },
  },
}
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
.text {
  margin-top: 10px;
  textarea {
    width: 100%;
    height: 130px;
    padding: .2rem;
    border-radius: .5rem;
  }
}

.photos {
  padding-top: 20px;
}
.save-button {
  padding: .3rem;
  margin-top: 10px;
  width: 100%;
  outline: none;
  font-size: 16px;
  font-weight: bold;
  transition: .5s;
  border-radius: .5rem;
  border: 0;
  background: #4B89DC;
  box-shadow:  0px 2px 5px rgb(0,0,0, 0.1);
}
 
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>