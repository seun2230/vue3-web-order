<template>
  <div class="container">
    <div class="page__notice">
        <div class="inner-text">
          &nbsp;<i class="fas fa-calendar-check"></i> &nbsp;&nbsp;
          <div class="notice__desc">
          [공지] 다음 주 휴무일은 월요일입니다.
          </div>
        </div>
      </div>
    <div class="inner">
      <div class="page__today">
         <div class="inner-title">
          오늘의 메뉴
        </div>
        <div class="inner-body">
          <img src="../assets/Pizza.jpg" class="img-today" />
        </div>
      </div>
      <router-link to='/user/shopInfo' v-slot='{href, navigate}'
          :href='href' @click='navigate' class="page__shop">
        <div class="inner-title">
          매장 정보
        </div>
        <div class="inner-body">
          <img src="../assets/Shop.jpg" class="img-shop" />
        </div>
      </router-link>
      <div class="page__guide">
         <div class="inner-title">
          이용 안내
        </div>
        <div class="inner-body">
          <img src="../assets/Help.jpg" class="img-guide" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  methods: {
  },
  components: {

  }
}
</script>

<style scoped lang="scss">
.img-today, .img-guide, .img-shop {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.inner-title {
  padding: 7px 0px 0px 10px;
  height: 30px;
  font-size: 1rem;
  color: white;
  background-color: rgb(255, 150, 0);
}

.page__shop {
  display: flex;
  flex-direction: column;
  margin: 15px 20px 20px 20px;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
  .inner-body {
    height: 15vh;
  }
}

.page__guide {
  display: flex;
  flex-direction: column;
  margin: 15px 20px 20px 20px;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
  .inner-body {
    height: 13vh;
  }
}

.page__today {
  display: flex;
  flex-direction: column;
  margin: 15px 20px 20px 20px;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
  .inner-body {
    height: 15vh;
  }
}

.page__notice {
  display: flex;
  height: 3vh;
  text-align: center;
  font-size: 0.8rem;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
  background-color: rgba(0, 0, 0, 0.9);
  color: white;

  .inner-text {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
}

</style>