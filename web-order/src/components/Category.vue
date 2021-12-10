<template>
<div>
  <div class="title">
    <h1>{{ title }}</h1>
  </div>
  <div class="container">
  <el-row>
    <el-col span="10" >
      <el-card class="card"
        shadow="never" :body-style="{padding: '0px'}">
        <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          class="image"/>
          <span> 밥 </span>
          <div class="bottom">
            <el-button type="button" 
              class="button"
              size="small"
              @click="searchMenu()">메뉴 보러가기</el-button>
          </div>
      </el-card>
    </el-col>
    <el-col span="10">
      <el-card class="card"
      shadow="never" :body-style="{padding: '0px'}">
        <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          class="image"/>
          <span> 라면 </span>
          <div class="bottom">
            <el-button type="button" 
              class="button" 
              size="small">메뉴 보러가기</el-button>
          </div>
      </el-card>
    </el-col>
    <el-col span="10">
      <el-card class="card"
      shadow="never" :body-style="{padding: '0px'}">
        <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          class="image"/>
          <span> 음료수 </span>
          <div class="bottom">
            <el-button type="button" 
            class="button"
            size="small">메뉴 보러가기</el-button>
          </div>
      </el-card>
    </el-col>
  </el-row>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      title: 'category'
    }
  },
  methods: {
    searchMenu() {
      this.$router.push('menu')
    }
  }
}
</script>

<style scoped lang="scss">

.title {
  text-align: center;
 
  h1 {
   font-size: 30px;
   color: orange;
  }
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
 //  background-color: rgba(255, 166, 0);

}

.card {
  font-family: system-ui, serif;
  text-align: center; 
  width: 100px;
  padding: 10px;
  margin-bottom: 10px;
  background:rgb(245, 245, 220, 0.3);
  border-radius: 5px;


  .image {
    width: 100%;
  }
}

.button {
  background-color: rgb(54, 51, 51);
  color: white;
  border-radius: 8px;
  font-size: 1px;
}
</style>