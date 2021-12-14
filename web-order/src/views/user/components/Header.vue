<template>
  <el-page-header 
  :content="detail" 
  @back="goBack" 
  @Home="goHome"/>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    const url = window.location.href
    const urlSplit = url.split('/').reverse()[0]
    
    return {
      detail: urlSplit
    }
  },
  mounted: {
    ...mapState('user',['token'])
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goHome() {
      
    }
  }
}
</script>