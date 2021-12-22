<template>
  <div class="main-container">
    <div class="room-file-upload-wrapper">
      <div v-if="!files.length" class="room-file-upload-example-container">
        <div class="room-file-upload-example">
            <div class="room-file-notice-item room-file-upload-button">
              <div class="image-box">
                <label for="file">사진 등록</label>
                <input type="file" id="file" ref="files" @change="imageUpload" multiple />
              </div>
            </div>
          </div>
        </div>
        <div v-else class="file-preview-content-container">
          <div class="file-preview-container">
            <div v-for="(file, index) in files" :key="index" class="file-preview-wrapper">
              <div class="file-close-button" @click="fileDeleteButton" :name="file.number">
              x
              </div>
              <img :src="file.preview" />
            </div>
            <div v-if="files.length < 3" class="file-preview-wrapper-upload">
              <div class="image-box">
              <label for="file">추가 사진 등록</label>
              <input type="file" id="file" ref="files" @change="imageAddUpload" multiple />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
        this.$emit('child', this.files)
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
        this.$emit('child', this.files)
      num = i;
      }
      this.uploadImageIndex = this.uploadImageIndex + num + 1;
    },
    fileDeleteButton(e) {
      const name = e.target.getAttribute('name');
      this.files = this.files.filter(data => data.number !== Number(name));
      this.$emit('child', this.files)
    },
  },
}
</script>

<style lang="scss" scoped>
#app .main-container {
  margin: 0px;
}

.main-container {
  width: 100%;
  min-height: 220px;
  margin: 0px;
  .room-file-upload-wrapper {
    border: 1px solid #dddddd;
    background-color: #f4f4f4;
    padding: 30px;
    width: 100%;
    min-height: 220px;
    font-size: 15px;
    color: #888888;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .room-file-upload-example-container {
      display: flex;
      align-items: center;
      justify-content: center;
      .room-file-image-example-wrapper {
        text-align: center;
        .room-file-notice-item {
        margin-top: 5px;
        text-align: center;
        }
      }
    }
  }
}
.file-preview-content-container {
  height: 100%;
}
.image-box {
  margin-top: 70px;
  padding-bottom: 20px;
  text-align: center;
}
.image-box input[type='file'] {
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
}
.image-box label {
  display: inline-block;
  padding: 10px 20px;
  background-color: #232d4a;
  color: #fff;
  vertical-align: middle;
  font-size: 15px;
  cursor: pointer;
  border-radius: 5px;
}
.file-preview-wrapper>img {
  position: relative;
  width: 200px;
  height: 200px;
  z-index: 10;
}
.file-preview-container {
  width: 100%;
  min-height: 220px;
  max-width: 220px;
  display: flex;
  flex-wrap: wrap;
  .file-preview-wrapper {
    height: 220px;
    padding: 10px;
    position: relative;
    vertical-align: middle;
    .file-close-button {
      position: absolute;
      line-height: 18px;
      z-index: 99;
      font-size: 18px;
      right: 5px;
      top: 10px;
      color: #fff;
      font-weight: bold;
      background-color: #666666;
      width: 20px;
      height: 20px;
      text-align: center;
      cursor: pointer;
    }
  }
  .file-preview-wrapper-upload {
    margin: 10px;
    vertical-align: middle;
    background-color: #888888;
    width: 200px;
    height: 200px;
  }
}

</style>