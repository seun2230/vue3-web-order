<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <hr />
    <div class="inner">
      <p> * 고객님의 솔직한 리뷰를 남겨주세요. </p>
      <div class="inner-form">
        <el-form 
          ref="form" 
          :model="form"
          label-width="100px">
          <el-form-item 
            label="제목"
            placeholder="최소 15자 내외로 작성해주세요.">
            <el-input 
              v-model="form.title" />
          </el-form-item> 
          <el-form-item 
            label="메뉴 이름">
            <el-select
              v-model="form.menu" 
              placeholder="오늘의 메뉴는?">
              <el-option
                v-for="food in foods"
                :key="food.food_id"
                :label="food.food_name"
                :value="food.food_id" />
            </el-select>
          </el-form-item>

          <el-form-item label="평점">
            <el-select 
              v-model="form.ratings"
              width="30px"
              placeholder="메뉴 만족하셨나요?" >
              <el-option 
                label="😍: 아주 만족해요" 
                value="1" />         
              <el-option 
                label="😊: 만족해요 " 
                value="2" />
              <el-option 
                label="🙄: 보통이에요 " 
                value="3" />
              <el-option 
                label="🙁: 그냥 그래요 " 
                value="4" />
              <el-option 
                label="😟: 별로에요" 
                value="5" />
            </el-select>
          </el-form-item>
          <el-form-item 
            label="기타 의견">
            <el-input 
              v-model="form.review"
              placeholder="고객님의 의견을 남겨주세요. :)" 
              type="textarea"/>
          </el-form-item>
          <el-form-item>
            <input 
              type="file"
                name="file"
              ref="file"
              @change="addFile()"
              multiple />
          </el-form-item>
          <el-form-item label="리뷰 공개">
            <el-radio-group v-model="form.status">
              <el-radio label="true">동의</el-radio>
              <el-radio label="false">비동의</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button @click="$router.push('/pageList')">취소</el-button>
            <el-button 
              color="black" 
              class="btn-review"
              @click="sendReview()">리뷰 등록
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState} from 'vuex'

export default {
  data() {
    return {
      active: false,
      title: '리뷰 작성',
      files: [],
      form: {
        title: '',
        menu:'',
        review: '',
        status: '',
      }
    }
  },
  created() {
    this.$store.commit('food/getState')
  },
  computed: {
    ...mapState('food', ['foods'])
  },
  methods: {
    addFile() {    
      for(let i = 0; i < this.$refs.file.files.length; i++) {
        this.files[i] = this.$refs.file.files[i];
      }
      console.log("this.files", this.files);
    },

    sendReview() {
        // FormData(): 페이지 전환없이 폼 데이터 제출 하는 경우
      let formData = new FormData(); 
      for(let i = 0; i < this.files.length; i++) {
        
        formData.append('file', this.files[i]);
        console.log("file" , this.files);
      }
       
      formData.append("title", this.form.title);
      formData.append("menu", this.form.menu); 
      formData.append("ratings", this.form.ratings); 
      formData.append("review", this.form.review);
      formData.append('status', this.form.status);
      

      for (var value of formData.values()) {
        console.log("value", value);
      }
      axios.post('http://localhost:3000/user/comments', formData, { 
        headers: {
          'Content-Type': 'multipart/form-data'
        },
  
      })      
      .then((res) => {
        console.log("데이터 전달 성공", res);
        console.log(formData);
      })
      .catch((err) => {
        console.error("오류 발생함", err);
      });
    },

    removeFile() {
      this.files = [];
      console.log(this.files);
    }
  }
};

</script>

<style lang="scss" scoped>
.container {
  border: 1px solid #ccc;
  padding: 10px;
}

.btn-review {
  margin-top: 10px;
  color: #fff;
}

</style>