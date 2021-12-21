<template>
  <el-page-header content="detail" @back="goBack" />
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const goBack = () => {
      console.log('go back')
    }

    return {
      goBack,
    }
  },
})
</script>