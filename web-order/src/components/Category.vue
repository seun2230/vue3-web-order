<template>
<div>
  <div class="title">
    <h1>{{ title }}</h1>
  </div>
  <div class="container">
  <el-row>
    <el-col span="7" >
      <el-card class="card" >
        <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          class="image"/>
          <span> 밥 </span>
          <div class="bottom">
            <el-button type="button" class="button">메뉴 보러가기</el-button>
          </div>
      </el-card>
    </el-col>
    <el-col span="7">
      <el-card class="card">
        <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          class="image"/>
          <span> 라면 </span>
          <div class="bottom">
            <el-button type="button" class="button">메뉴 보러가기</el-button>
          </div>
      </el-card>
    </el-col>
    <el-col span="7">
      <el-card class="card">
        <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          class="image"/>
          <span> 음료수 </span>
          <div class="bottom">
            <el-button type="button" class="button">메뉴 보러가기</el-button>
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
  }
}
</script>

<style scoped lang="scss">

.title {
  text-align: center;
 
  h1 {
   font-size: 50px;
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
  padding: 10px 30px;
  width: 50%;
  font-size: 2rem;
  margin-bottom: 10px;
  border-radius: 5px;


  .image {
    width: 100%;
    display: block;
  }
}

.button {
  background-color: black;
  color: white;
  font-size: 5px;
  border-radius: 5rem;
}
</style>