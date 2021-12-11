<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <hr />
    <div class="inner">
      <p> * 고객님의 솔직한 리뷰를 남겨주세요. </p>
      <div class="inner-form">
        <el-form 
          ref="form" 
          :model="form">
          <el-form-item 
            label="사용자">
            <el-input 
              v-model="form.name" />
          </el-form-item>
          <el-form-item 
            label="제목">
            <el-input 
              v-model="form.subject"/>
          </el-form-item> 
          <el-form-item 
            label="메뉴 이름">
            <el-input 
              v-model="form.menu"/>
          </el-form-item>

          <el-form-item label="평점">
            <el-select 
              v-model="form.rating"
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
              placeholder="최소 15자 내외로 작성해주세요." 
              type="textarea"/>
          </el-form-item>
          <input 
            type="file"
              name="file"
            ref="file"
            @change="addFile()"
            multiple /><br />
          <el-form-item label="리뷰 공개">
            <el-radio-group v-model="form.check">
              <el-radio label="동의" />
              <el-radio label="비동의" />
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

export default {
  data() {
    return {
      active: false,
      title: '리뷰 작성',
      files: [],
      form: {
        name: '',
        subject: '',
        menu:'',
        review: '',
        check: '',
      }
    }
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
      
      formData.append("name", this.form.name);
      formData.append("subject", this.form.subject);
      formData.append("menu", this.form.menu);
      formData.append("review", this.form.rating);
      formData.append("review", this.form.review);
      

      for (var value of formData.values()) {
        console.log("value", value);
      }
      axios.post('http://localhost:3000/review', formData, { 
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
}

.btn-review {
  margin-top: 10px;
  color: #fff;
}

</style>