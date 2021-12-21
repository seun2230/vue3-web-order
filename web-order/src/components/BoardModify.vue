<template>
  <div class="container">
    <div class="inner">
      <p> * 고객님의 솔직한 리뷰를 남겨주세요. </p>
      <div class="inner-form">
        <el-form 
          ref="form" 
          :model="form"
          label-position="top"
          label-width="100px">
          <el-form-item 
            label="제목"
            placeholder="최소 15자 내외로 작성해주세요.">
            <el-input 
              v-model="form.title" />
          </el-form-item> 
          <el-form-item label="평점">
            <el-select 
              v-model="form.ratings"
              width="30px"
              placeholder="음식/가격?" >
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
                label="😤: 별로에요" 
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
            <div
              class="image-preview"
              @click="addFiles()">
              <div
                class="image-preview-item"
                v-for="(file, key) in files"
                :key="'file-' + key">
                <div class="img-box">
                  <img
                    class="image-preview-image"
                    :id="'image-' + parseInt(key)" />
                </div>  
              </div>
            </div>
            <input
              type="file"
              id="multiple-image-input"
              accept="image/*"
              multiple
              @change="handleFileUpload($event)" />
          </el-form-item>
          <el-form-item>
            <el-button @click="returnBoard()">취소</el-button>
            <el-button 
              color="black" 
              class="btn-review"
              @click="sendReview()">리뷰 수정
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
      files: [],
      form: {
        title: '',
        review: '',
        ratings:'',
      }
    }
  },
  methods: {
    returnBoard() {
      this.$router.push('/user/board/');
    },
    sendReview() {
      var id = this.$route.params.id; 
      console.log("id", id);
      let formData = new FormData(); 
      for(let i = 0; i < this.files.length; i++) {
        formData.append('file', this.files[i]);
      }
      formData.append("title", this.form.title);
      formData.append("ratings", this.form.ratings); 
      formData.append("review", this.form.review);


      axios.post(`${process.env.VUE_APP_URL}/api/user/update/comment/` + id,
      formData, { 
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      })      
      .then((res) => {
        
        console.log("데이터 전달 성공", res);
        console.log(formData);
        console.log(id);
        alert('고객님의 리뷰가 수정되었습니다.')
        this.$router.push('/user/board/')
      })
      .catch((err) => {
        console.error("오류 발생함", err);
      });
    },

    addFiles() {
      console.log("addFiles Clicked!")
      document.getElementById('multiple-image-input').click();
    },
    handleFileUpload(event) {
      let uploadedFiles = event.target.files;
      
      for (let i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i]);
      }
  
      this.getImagePreviews();
    },
    getImagePreviews() {
      for (let i = 0; i < this.files.length; i++) {
        let reader = new FileReader();

        reader.addEventListener("load", function() {
          document.getElementById('image-' + parseInt(i)).src = reader.result;
        }.bind(this), false);

        reader.readAsDataURL(this.files[i]);
      }
    },
    removeFile() {
      this.files = [];
      console.log(this.files);
    }
  }
};

</script>

<style lang="scss" scoped>
@import '../scss/variables.scss';

.container {
  border: 1px solid #ccc;
  padding: 10px;
}

.btn-review {
  margin-top: 10px;
  color: #fff;
}
input {
  display: none;
}
.image-preview {
  display: flex;
  overflow: hidden;
  min-width: 200px;
  max-width: 200px;
  height:200px;
  border-radius: 9px;
  background: $mainBg;
  justify-content: cover;
  .image-preview-item {
    img {
    position: absolute;
    top: 50px;
    left: 50px;
    width: 100px;
    height: 100px;
    }
  }
}
.img-box{
  border: solid;
}
</style>