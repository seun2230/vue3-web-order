<template>
  <div class="container">
    <el-form>
    <h4 class="title">현재 사용중인 Slide Image</h4>
      <el-form-item class="inner-item"> 
        <div class="image-status" v-if="paginatedData.length !== 0">
          <div class="file-close-button" @click="DeleteButton(paginatedData[0].id_slide)">
            <i class="far fa-trash-alt" style="color: #ffffff"></i>
          </div>
          <img 
            :src="paginatedData[0].slide_image" 
            :alt="paginatedData[0].id_slide" />
            <div class="page-view">
              <el-button @click="prevPage" type="text" :disabled="pageNum === 0">
              이전
              </el-button>
              <span class="page-count">{{ pageNum + 1}} / {{ pageCount }}</span>
              <el-button @click="nextPage" type="text" :disabled="pageNum >= pageCount -1">
              다음
              </el-button>
            </div>
          </div>
        <div class="image-status" v-else>
          <div class="image-status-message-box">
            <span class="message">image가 없습니다.</span>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex'

export default {
  props: {
    pageSize: {
      type: Number,
      required: false,
      default: 1,
    },
  },
  data() {
    return {
      pageNum: 0,
      pageList: [],
    }
  },
  created() {
    this.$store.commit('admin/getSlide');
  },
  computed: {
    ...mapState('admin',['slide']),
    pageCount() {
      let listLength = this.slide.length,
          listSize = this.pageSize,
          page = Math.floor(listLength / listSize);
      if(listLength % listSize > 0) page += 1;
      return page;
    },
    paginatedData() {
      const start = this.pageNum * this.pageSize;
      const end = start + this.pageSize;
      return this.slide.slice(start, end);
    },
  },
  methods: {
    nextPage() {
      this.pageNum += 1;
    },
    prevPage() {
      this.pageNum -= 1;
    },
    DeleteButton(e) {
      console.log("clicked!")
      console.log(e)
      axios.post(`${process.env.VUE_APP_URL}/api/admin/post/delete/slide/` + e)
      .then(res => {
        console.log(res)
        this.$router.go();
      }).catch(err => {
        console.log(err);
        this.$router.go();
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 540px;
  padding: 20px;
  background-color: #ffffff;
  justify-content: center;
}

.file-close-button {
  position: absolute;
  z-index: 99;
  font-size: 40px;
  right: 10px;
  top: 10px;
  cursor: pointer;
}
.inner-item {
  justify-content: center;
}
.image-status {
  width: 100%;
  height: 100%;
}
.image-status-message-box {
  width: 500px;
  height: 500px;
  text-align: center;
}
.title {
  text-align: center;
}
</style>