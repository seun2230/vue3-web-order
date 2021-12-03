<template>
  <nav
    class="mobile-bottom-nav"
    @click="click()">
    <router-link 
      to="/home"
      class="mobile-bottom-nav__item mobile-bottom-nav__item--active">
      <div class="mobile-bottom-nav__item-content">
        <i class="fas fa-home fa-2x"></i>
        HOME
      </div>		
    </router-link>
    <router-link
      to="/menu"
      class="mobile-bottom-nav__item">
      <div class="mobile-bottom-nav__item-content">
        <i class="fas fa-cookie fa-2x"></i>
        MENU
      </div>
    </router-link>
    <router-link 
      to="/mypage"
      class="mobile-bottom-nav__item">
      <div class="mobile-bottom-nav__item-content">
        <i class="far fa-user fa-2x"></i>
        MYPAGE
      </div>		
    </router-link>
    <router-link
      to="/board"
      class="mobile-bottom-nav__item">
      <div class="mobile-bottom-nav__item-content">
        <i class="far fa-grin-squint-tears fa-2x"></i>
        BOARD
      </div>		
    </router-link>
  </nav>
</template>

<script>
export default {
  methods: {
    click() {
      var navItems = document.querySelectorAll(".mobile-bottom-nav__item");
      navItems.forEach(function(e) {
        e.addEventListener("click", function() {
          navItems.forEach(function(e2) {
            e2.classList.remove("mobile-bottom-nav__item--active");
          })
            this.classList.add("mobile-bottom-nav__item--active");
        });
      });
    }
  },
  // mounted: {
  //   turnOn() {
  //     var navItems = document.querySelectorAll(".mobile-bottom-nav__item");
  //     navItems.classList.add("mobile-bottom-nav")
  //   }
  // }
}
</script>

<style lang="scss" scoped>
a { 
text-decoration: none; color: black; 
}a:visited { 
  text-decoration: none; 
  }
  a:hover { 
    text-decoration: none; 
    }
    a:focus {
      text-decoration: none; 
      }
    a:hover, a:active { 
      text-decoration: none; 
      }

  .mobile-bottom-nav{
    position:fixed;
    bottom:0;
    left:0;
    right:0;
    z-index:1000;
    
    text-decoration: none; 
    color: black;

    //give nav it's own compsite layer
    will-change:transform;
    transform: translateZ(0);
    
    display:flex;	
    
    height:50px;
    
    box-shadow: 0 -2px 5px -2px #333;
    background-color:#fff;
    
    &__item{
      flex-grow:1;
      // text-align:center;
      font-size:12px;
      
      display:flex;
      flex-direction:column;
      justify-content:center;
    }
    &__item--active{
      //dev
      color:red;
      text-decoration-line: none;
    }
    &__item-content{ 
      align-items: center;
      display:flex;
      flex-direction:column;
      text-decoration-line: none;		
    }
    .mobile-bottom-nav:visited { 
      text-decoration: none;
      }
    .mobile-bottom-nav:hover { 
      text-decoration: none;
      }
    .mobile-bottom-nav:focus { 
      text-decoration: none; 
      }
    .mobile-bottom-nav:hover, .mobile-bottom-nav:active {
      text-decoration: none;
      }
  }
</style>