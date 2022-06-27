<template>
  <div class="main-container">
    <div class="file-upload-wrapper">
      <div 
        v-if="!files.length"
        class="file-upload-button">
        <div class="image-box">
          <label for="file">+</label>
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
        class="file-preview-wrapper">
        <div class="file-preview-content">
          <div 
            v-for="(file, index) in files"
            :key="index"
            class="file-preview-content">
            <div 
              class="file-close-button" 
              @click="fileDeleteButton" 
              :name="file.number">
              x
            </div>
            <img :src="file.preview" />
          </div>
          <div 
            v-if="files.length < 3" 
            class="file-preview-wrapper-upload">
            <div class="image-box">
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
    border: 2px dotted #dddddd;
    background-color: #f4f4f4;
    padding: 30px;
    width: 100%;
    height: 100%;
    font-size: 20px;
    color: #888888;
    .file-upload-button {
      text-align: center;
      // align-items: center;
      // vertical-align: middle;
    }
  }

}
.image-box input[type='file'] {
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
}
.image-box {
  text-align: center;
}
</style>