<template>
 <header>
    <nav class="nav">
     <i class="fas fa-bars fa-2x"></i>
      <div class="navbar__menu">
        <ul>
           <li 
              v-for="nav in navigation" 
              :key="nav.name">
              {{ nav.name }}
            </li>
        </ul>
         
      </div>

     <div class="navbar__logo">
       <li><i class="fas fa-hamburger fa-2x"></i></li>
     </div>

     <div class="navbar__info">
      <button><i class="fas fa-shopping-cart fa-2x"></i></button>
     </div>
   </nav>
 </header>
</template>

<script>
export default {
  data() {
    return {
      title: '곁두리',
      navigation: [
        { name: 'Home'},
        { name: 'Sign up'},
        { name: 'Login'},
        { name: 'Admin'},
      ]
    }
  }
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
  margin-bottom: 10px;
  border: 1px solid #bcbcbc;
  // 좌 우 상 하 기준으로 그림자 처리함
  box-shadow: 0 4px 4px -5px black;
}

.nav {
  @include center;
}
.navbar__menu {
  @include center;
  
  ul li {
    list-style: none;
    float: left;
    font-size: 15px;
    padding: 3 8px;
  };

}

.navbar__logo {
  @include center;
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