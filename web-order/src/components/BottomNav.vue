<template>
  <nav
    class="mobile-bottom-nav"
    @click="click()">
    <div class="mobile-bottom-nav__item mobile-bottom-nav__item--active">
      <div class="mobile-bottom-nav__item-content">
        <i class="fas fa-camera">
          
        </i>
        one
      </div>		
    </div>
    <div class="mobile-bottom-nav__item">		
      <div class="mobile-bottom-nav__item-content">
        <i class="material-icons">mail</i>
        two
      </div>
    </div>
    <div class="mobile-bottom-nav__item">
      <div class="mobile-bottom-nav__item-content">
        <i class="material-icons">person</i>
        three
      </div>		
    </div>
	
    <div class="mobile-bottom-nav__item">
      <div class="mobile-bottom-nav__item-content">
        <i class="material-icons">phone</i>
        four
      </div>		
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    click() {
      var navItems = document.querySelectorAll(".mobile-bottom-nav__item");
      navItems.forEach(function(e, i) {
        console.log("first i ",i)
        e.addEventListener("click", function(e) {
          console.log("second e ",e)
          navItems.forEach(function(e2, i2) {
            console.log("third i2", i2)
            e2.classList.remove("mobile-bottom-nav__item--active");
          })
            this.classList.add("mobile-bottom-nav__item--active");
        });
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  .mobile-bottom-nav{
    position:fixed;
    bottom:0;
    left:0;
    right:0;
    z-index:1000;
    
    //give nav it's own compsite layer
    will-change:transform;
    transform: translateZ(0);
    
    display:flex;	
    
    height:50px;
    
    box-shadow: 0 -2px 5px -2px #333;
    background-color:#fff;
    
    &__item{
      flex-grow:1;
      text-align:center;
      font-size:12px;
      
      display:flex;
      flex-direction:column;
      justify-content:center;
    }
    &__item--active{
      //dev
      color:red;
    }
    &__item-content{ 
      display:flex;
      flex-direction:column;		
    }
  }
</style>