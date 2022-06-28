<template>
  <div class="main-container">
    <div class="file-upload-wrapper">
      <div 
        v-if="!files.length"
        class="file-upload-button">
        <div class="image-box">
          <label 
            id="upload-button"
            for="file">+</label>
          <input 
            type="file" 
            id="file" 
            ref="files" 
            @change="imageUpload" 
            multiple />
        </div>
      </div>
      <div 
        v-else
        class="file-preview-container">
        <div class="file-preview-wrapper">
          <div 
            v-for="(file, index) in files"
            :key="index"
            class="file-preview-content">
            <div 
              class="file-close-button" 
              @click="fileDeleteButton" 
              :name="file.number">
              <span>x</span>
            </div>
            <img :src="file.preview" />
          </div>
          <div 
            v-if="files.length < 3" 
            class="file-preview-wrapper-upload">
            <div class="preview-image-box">
              <label for="file">추가 사진 등록</label>
              <input 
                type="file" 
                id="file" 
                ref="files" 
                @change="imageAddUpload" 
                multiple />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
emits: ['child'],
  data() {
    return {
      files: [],
      filesPreview: [],
      uploadImageIndex: 0
    }
  },
  methods: {
    imageUpload() {
      let num = -1;
      for (let i = 0; i < this.$refs.files.files.length; i++) {
        this.files = [
          ...this.files,
          {
            file: this.$refs.files.files[i],
            preview: URL.createObjectURL(this.$refs.files.files[i]),
            number: i
          }
        ];
        this.$emit('child', this.files);
        num = i;
      }
      this.uploadImageIndex = num + 1;
    },
    imageAddUpload() {
      let num = -1;
      for (let i = 0; i < this.$refs.files.files.length; i++) {
        this.files = [
          ...this.files,
          {
            file: this.$refs.files.files[i],
            preview: URL.createObjectURL(this.$refs.files.files[i]),
            number: i + this.uploadImageIndex
          }
        ];
        this.$emit('child', this.files);
      num = i;
      }
      this.uploadImageIndex = this.uploadImageIndex + num + 1;
    },
    fileDeleteButton(e) {
      const name = e.target.getAttribute('name');
      this.files = this.files.filter(data => data.number !== Number(name));
      this.$emit('child', this.files);
    },
  },
}
</script>

<style lang="scss" scoped>
#app .main-container {
  margin: 0;
}
.main-container {
  width: 120px;
  height: 120px;
  .file-upload-wrapper {
    border: 1px dotted #dddddd;
    border-radius: .5rem;
    background-color: #f4f4f5;
    box-shadow: 2px 4px 2px #0000001a;
    padding: 30px;
    width: 100%;
    height: 100%;
    font-size: 20px;
    color: #888888;
  }
}
.image-box input[type='file'],
.preview-image-box input[type='file'] {
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
}
.preview-image-box label {
  margin: 0;
  padding: 0;
  font-size: 16px;
  color: #333;
  background-color: #ffa600a9;
}
.file-preview-wrapper {
  min-width: 240px;  
  min-height: 220px;
  display: flex;
  flex-direction: row;
  flex-wrap: flex-start; 
  position: absolute;
  left: 0;
  top: 0;
}

.file-preview-content>img {
  position: relative;
  background-color: purple;
  width: 120px;
  height: 120px;
  z-index: 1;
}

.file-preview-wrapper-upload {
  margin: 10px;
  vertical-align: middle;
  width: 100%;
  height: 200px;
}

img {
  width: 100%;
  height: 100%;
  border-radius: .5rem;
  z-index: 1;
}
.file-upload-button {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center
}
.file-close-button {
  width: 20px;
  padding-left: 5px;
  border: 1px solid #333;
  border-radius: .5rem;
  color: #333;
  display: flex;
  text-align: center;
  outline: none;
  font-size: 16px;
  position: fixed;
  bottom: 410px;
  left: 120px;
  z-index: 5;
  transition: .5s;
}
</style>