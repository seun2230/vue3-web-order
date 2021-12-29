<template>
  <div class="container">
    <div class="inner">
      <div class="inner-form">
        <el-form
          ref="form"
          :model="form"
          label-position="top"
          label-width="100px">
          <el-form-item label="평점">
            <el-select
              v-model="form.ratings"
              width="30px"
              placeholder="음식/가격?" >
              <el-option
                label="😍: 아주 만족해요"
                value="5" />
              <el-option
                label="😊: 만족해요 "
                value="4" />
              <el-option
                label="🙄: 보통이에요 "
                value="3" />
              <el-option
                label="🙁: 그냥 그래요 "
                value="2" />
              <el-option
                label="😤: 별로에요"
                value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="키워드 등록(중복 선택 가능)" />
          <el-carousel height="250px"
            :interval="8000"
            arrow="always">
            <el-carousel-item>
               <h3>메뉴</h3>
                <div class="keyword-menu"
                    v-for="food in paginatedData"
                    :key="food.food_id">
                  <input
                    type="checkbox"
                    v-model="keywords"
                    :id="food.food_name"
                    :value="food.food_name"/>
                  <label
                    :for="food.food_name">{{ food.food_name }} 맛있어요</label>
                </div>
                <!-- <div class="page-view">
                  <el-button @click="prevPage" type="text" :disabled="pageNum === 0">
                    first <i class="fas fa-angle-left"></i>
                  </el-button>
                  <span class="page-count">{{ pageNum + 1}} / {{ pageCount }}</span>
                  <el-button @click="nextPage" type="text" :disabled="pageNum >= pageCount -1">
                    last <i class="fas fa-angle-right"></i>
                  </el-button>
                </div> -->
            </el-carousel-item>
            <el-carousel-item>
              <h3>주문</h3>
               <input
                type="checkbox"
                v-model="keywords"
                id="keyword1"
                value="대기열이 짧아요"/>
              <label
                for="keyword1">대기열 짧아요</label>
             <input
              type="checkbox"
              v-model="keywords"
               id="keyword2"
               value="가성비가 좋아요"/>
              <label for="keyword2">가성비가 좋아요</label>
             <input
              type="checkbox"
              v-model="keywords"
               id="keyword3"
               value="주문 간편해요"/>
              <label for="keyword3">🛒주문 간편해요</label>
              <input
                type="checkbox"
                v-model="keywords"
                id="keyword4"
                value="결제가 빨라요"/>
              <label for="keyword4">결제가 빨라요</label>
              <input
                type="checkbox"
                v-model="keywords"
                id="keyword5"
                value="주문 길어요"/>
              <label for="keyword5">주문 길어요</label>
              <input
                type="checkbox"
                v-model="keywords"
                id="keyword6"
                value="주문 알림 필요해요"/>
              <label for="keyword6">주문 알림 필요해요</label>
            </el-carousel-item>
            <el-carousel-item>
              <h3>매장</h3>
              <input
                type="checkbox"
                v-model="keywords"
                id="keyword7"
                value="사장님이 친절해요"/>
              <label for="keyword7">👩‍🍳사장님 친절해요"</label>
              <input
                type="checkbox"
                v-model="keywords"
                id="keyword8"
                value="뷰가 좋아요"/>
              <label for="keyword8">🏝 뷰가 좋아요</label> <br />
               <input
                type="checkbox"
                v-model="keywords"
                id="keyword9"
                value="분위기가 조용해요"/>
              <label for="keyword9">분위기가 조용해요</label>
              <input
                type="checkbox"
                v-model="keywords"
                id="keyword10"
                value="매장이 청결해요"/>
              <label for="keyword10">매장이 청결해요</label>
             <input
              type="checkbox"
              v-model="keywords"
              id="keyword11"
              value="주차 시설이 괜찮아요"/>
              <label for="keyword11">🚗주차 편리해요</label>
              <input
                type="checkbox"
                v-model="keywords"
                id="keyword12"
                value="혼자 와도 좋아요"/>
              <label for="keyword12">혼자도 편해요</label>
            </el-carousel-item>
          </el-carousel>
          <el-form-item label="후기 등록">
            <el-input
              v-model="form.review"
              placeholder="고객님의 의견을 남겨주세요. :)"
              type="textarea"/>
          </el-form-item>
          <el-form-item>
            <UserImagePreview @child="setData"/>
          </el-form-item>
          <el-form-item label="리뷰 공개">
            <el-radio-group v-model="form.status">
              <el-radio
                label="true">
                동의
              </el-radio>
              <el-radio
                label="false">
                비동의
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button
              type="default"
              class="btn-review"
              @click="sendReview()">저장
            </el-button>
            <el-button @click="returnBoard()">취소</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import UserImagePreview from './UserImagePreview.vue';

export default {
  props: {
    pageSize: {
       type: Number,
       required: false,
       default: 6
    }
  },
  components: {
    UserImagePreview,
  },
  data() {
    return {
      food_name: null,
      files: [],
      keywords: [],
      pageList: [],
      pageNum: 0,
      form: {
        title: '',
        review: '',
        status: '',
      }
    }
  },
  created() {
    this.$store.commit('food/getState')
  },
  computed: {
    ...mapState('food', ['foods']),

    pageCount() {
      let listLength = this.foods.length,
      listSize = this.pageSize,
      page = Math.floor(listLength / listSize)
      if(listLength % listSize > 0 ) page += 1;
      return page;
    },
    paginatedData() {
      const start = this.pageNum * this.pageSize;
      const end = start + this.pageSize;
      return this.foods.slice(start, end);
    }
  },
  methods: {
    prevPage() {
      this.pageNum -= 1;
    },
    nextPage() {
      this.pageNum += 1;
    },
    setData(e) {
      console.log(e);
      this.files = e
    },
    thisFilesCheck() {
      console.log("this.files", this.file)
    },
    returnBoard() {
      this.$router.push('/user/board');
    },
    sendReview() {
      console.log("keyword", this.keywords);

      let formData = new FormData();

      for(let j = 0; j < this.keywords.length; j++) {
        let keyword = this.keywords[j];
        console.log("keyword", keyword)
        formData.append("keyword", keyword);
      }
      for(let i = 0; i < this.files.length; i++) {
        let file = this.files[i].file;
        console.log("file test", file)
        formData.append("file", file);
      }
      formData.append("title", this.form.title);
      formData.append("ratings", this.form.ratings);
      formData.append("review", this.form.review);
      formData.append("status", this.form.status);

      const foodId =  this.$route.params.id;
      axios.post(`${process.env.VUE_APP_URL}/api/user/post/comment/` + foodId,
      formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      })
      .then((res) => {
        console.log("데이터 전달 성공", res);
        alert('고객님의 리뷰가 등록되었습니다.')
        this.$router.push('/user/board')
      })
      .catch((err) => {
        console.error("오류 발생함", err);
      });
    },
  }
};

</script>

<style lang="scss" scoped>
h3 {
  margin: 0px;
}
.container {
  padding: 0px 15px;
}

.btn-review {
  position: absolute;
  top: 0px;
  right: 10px;
  font-size: 0.8rem;
  color: white;
  background-color: rgba($color: #000000, $alpha: 0.8);
}

.img-box{
  border: solid;
}

p {
  margin: 10px 0px;
}
.keyword-menu{
  display: inline-block;
}

input[id] {
  position: relative;
  top: 4px;
}
label[for] {
  position: relative;
  top: 20px;
}

input[type="checkbox"]:checked + label {
  background-color: rgba(171, 205, 236, 0.534);
}
input[type="checkbox"] {
  display: none;
}
input[type="checkbox"] + label {
 display:inline-block;
  height: 40px;
  width: 150px;
  background:rgb(248, 248, 248);
  border: 1px solid rgb(235, 233, 233);
  border-radius: .2rem;
  padding: 10px;
  box-shadow: 0 2px 2px -4px black;
  margin-right: 10px;
  margin-bottom: 10px;
}
input {
  width: 150px;
  font-size: 25px;
  text-align: center;
  box-shadow: 0 0 0 3px rgb(124, 175, 223);
  border-radius: 2px solid #ccc;
  box-shadow: 0 4px 4px -4px black;
  padding: 10px;
}

.el-carousel__item  {
  color: #475669;
  font-size: 15px;
  text-align: center;

  h3 {
    margin: 0px;
    padding: 0px;
  }
}

</style>