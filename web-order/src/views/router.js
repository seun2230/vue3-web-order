import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/Homepage.vue'
import Admin from '../views/admin/Admin.vue'
import FoodManagePage from '../views/admin/page/FoodManagePage.vue'
import UserInfo from '../views/user/page/UserInfoPage.vue'
import UserModify from '../views/user/page/Modify.vue'
import SignPage from '../views/user/page/SignPage.vue'
import LoginPage from '../views/user/page/LoginPage.vue'
import Review from '../components/Review.vue'
import ReBoard from '../components/ReBoard.vue'
import BoardDetail from '../components/BoardDetail.vue'
import BoardModify from '../components/BoardModify'
import MenuPage from '../views/user/page/MenuPage.vue'
import UserPage from '../views/user/UserPage.vue'
import UserMyPage from '../views/user/page/UserMyPage.vue'
import ShopInfo from '../views/user/page/ShopInfo.vue'
import store from '../store'
import NullImageManagePage from './admin/page/NullImageManagePage';

const beforeAuth = isAuthenticated => (from, to, next) => {
  const isAuth = store.getters['user/isAuth'];
  if ((isAuth && isAuthenticated) || (!isAuth && !isAuthenticated)) {
    return next();
  } else {
    alert("로그인이 필요한 메뉴입니다.");
    next('/user/login');
  }
}


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/review',
    name: 'review',
    component: Review,
    meta: { metaName: '리뷰'}
  },
  {
    path: '/board',
    name: 'board',
    component: ReBoard,
    meta: { metaName: '게시판'}
  },

  {
    path: '/user',
    name: 'user',
    component: UserPage,
    children: [
      {
        path: 'review',
        name: 'review',
        component: Review,
        meta: { metaName: '리뷰 작성'}
      },
      {
        path: 'board',
        name: 'board',
        component: ReBoard,
        meta: { metaName: '리뷰'}
      },
      {
        path: 'board/:id',
        name: 'boardItem',
        component: BoardDetail,
        meta: { metaName: '리뷰 상세보기'}
      },
      {
        path: 'board/modify/:id',
        name: 'boardModify',
        component: BoardModify,

      },
      {
        path: 'sign',
        name: 'sign',
        component: SignPage,
        meta: { metaName: '회원가입'}
      },
      {
        path: 'login',
        name: 'login',
        component: LoginPage,
        meta: { metaName: '로그인'}
      },
      {
        path: 'menu',
        name: 'menu',
        component: MenuPage,
        meta: { metaName: '주문하기'}
      },
      {
        path: 'userinfo',
        name: 'userinfo',
        component: UserInfo,
        beforeEnter: beforeAuth(true),
        meta: { metaName: '내 정보'}
      },
      {
        path: 'modify',
        name: 'modify',
        component: UserModify,
        meta: { metaName: '내 정보 수정'}
      },
      {
        path: 'mypage',
        name: 'mypage',
        component: UserMyPage,
        meta: { metaName: '주문 내역'}
      },
      {
        path: 'shopinfo',
        name: 'shopinfo',
        component: ShopInfo,
        meta: { metaName: '매장 정보' }
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta: { RootName: 'admin' },
    //  admin 부모 아래에 meta를 공통속성 넣어주면 하단 nav 안 생김
    //  Homepage를 비롯해서 초기 접근하는 view가 user보다 상위이므로,
    //  nav가 어디에 포함되어야 할 지가 애매해짐.
    //  -> app.js 수준에서 라우터의 meta data를 읽어와서 선택적 렌더링
    children: [
      {
        path: 'nullImage',
        name: "nullImage",
        component: NullImageManagePage,
        meta: { RootName: 'admin' },
      },
      {
        path: 'foodManagement',
        name: 'foodManagement',
        component: FoodManagePage,
        meta: { RootName: 'admin' },
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router