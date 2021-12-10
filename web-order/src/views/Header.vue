<template>
 <header>
    <nav class="nav">
     <i class="fas fa-bars fa-2x"></i>

     <div class="navbar__logo">
       <li><i class="fas fa-hamburger fa-2x"></i></li>
     </div>

     <div class="navbar__info">
        <el-button type="danger" size="small">주문하기</el-button>
     </div>
   </nav>
 </header>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  
}
</script>

<style lang="scss" scoped>
@mixin center {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header {
  padding: 20px;
  margin-top: 0;
  border: 1px solid #bcbcbc;
  // 좌 우 상 하 기준으로 그림자 처리함
  box-shadow: 0 4px 4px -5px black;

  .nav {
  @include center;
  
  }
}

.navbar__logo {
  li {
    padding: 0 5px;
    list-style-type: none;
    &:hover {
      color: red;
      cursor: pointer;
    }
  }
}

.navbar__info {
   li {
    color: red;
  } 
}
@media screen and (max-width: 768px) {
    
  .navbar__menu {
    display: none;

  }
}



</style>