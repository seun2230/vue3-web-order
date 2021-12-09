<template>
   <div>
     <el-form 
      ref="form" 
      :model="form" 
      label-width="120px">
    <el-form-item 
      label="사용자">
      <el-input 
      v-model="form.name" />
    </el-form-item>
    <el-form-item 
      label="후기">
      <el-input 
        v-model="form.desc" 
        type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button 
        type="primary" 
        @click="onSubmit">제출
      </el-button>
      <el-button>취소</el-button>
    </el-form-item>
  </el-form>
   </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
        console.log('submit!')
    }
  }
};

</script>

<style>

</style>