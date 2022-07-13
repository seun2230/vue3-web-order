<template>
  <div class="container">
    <div class="inner">
      <div class="inner__user">
        <span class="user-list">
          {{ getUserName }}님
        </span> 주문하신 
        <span>
          {{ eachFood[0].food_name }}
        </span> 마음에 드셨나요?
      </div>
      <div class="inner__order">
        <!-- <img
        :src="eachFood[0].food_image1"
        :alt="eachFood[0].food_name" /> -->
        <img src="../assets/Pizza.jpg" />
        <div>
          <span class="order-name">
            {{ eachFood[0].food_name }}
          </span>
          <span>주문 가격 :{{ eachFood[0].food_price }}</span>
          <span>주문 날짜 :{{ orderList[0].order_date }}</span>
        </div>
      </div>
      <div 
        class="inner__choice"
        @click="show = !show">
        평점과 키워드를 선택해주세요.
      </div>
      <Transition>
        <div v-if="show">
          <CommentRating 
            @rating="saveRating" />
          <div class="keyword">
            키워드 :
            <input 
              type="input"
              v-model="keyword" /> 
          </div>
        </div>
      </Transition>
      <form>
        <div class="form__text">
          <textarea 
            v-model="text"
            placeholder="작성하신 리뷰는 100 point 적립됩니다. :)">
          </textarea>
        </div>
        <div class="form__photos">
          <span class="photos-text">사진 업로드</span>
          <CommentImageUpload @child="setData" />
        </div>
        <div class="form__option">
          <span>리뷰 공개</span>
          <div>
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
          </div>
        </div>
        <button
          type="button"
          class="btn--orange btn--xl"
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
    const id = this.$route.params.id;
    this.$store.commit("user/getOrderList"),
    this.$store.commit('food/getEachFood', id);
  },
  computed: {
    ...mapGetters('user', ['getUserName']),
    ...mapState('user', ['orderList']),
    ...mapState('food', ['eachFood']),
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
@import '@/scss/btn.scss';
@import '@/scss/common.scss';

.container {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: auto;
  padding: 1rem 1rem;
  border-radius: .25rem;
}
.inner__user {
  margin: 20px 0px;
  .user-list {
    padding: 10 0px;
    color: #ffa500;
    font-size: 20px;
    font-weight: 900;
  }
}
.inner__order {
  width: 100%;
  padding: 20px;
  margin-bottom: 15px;
  color: rgb(107, 103, 103);
  display: flex;
  flex-direction: row;
  background-color: #fcb22a86;
  box-shadow: 2px 2px 4px #0000001a;
  border-radius: .5rem;

  span {
    display: block;
    margin-left: 10px;
    margin-bottom: 5px;
  }
  .order-name {
    width: 70px;
    background: linear-gradient(to top, #e99b5293 50%, transparent 50%);
    align-items: center;
    font-weight: bold;
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: .2rem;
  }
}
.inner__choice {
  font-weight: bold;
}

form {
  font-weight: bold;
  margin: 10px 0px;
  .form__text {
    margin: 10px 0px;
  }
  .form__photos {
    margin: 10px 0px;
    .photos-text {
      display: block;
      padding-bottom: 5px;
    }
  }
  .form__option {
    margin: 10px 0px;
    display: flex;
    justify-content: space-between;
  }
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