import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/Homepage.vue'
import Admin from '../views/admin/Admin.vue'
import FoodManagePage from '../views/admin/page/FoodManagePage.vue'
import UserInfo from '../views/user/page/UserInfoPage.vue'
import UserModify from '../views/user/page/Modify.vue'
import SignPage from '../views/user/page/SignPage.vue'
import LoginPage from '../views/user/page/LoginPage.vue'
import Review from '../components/Review'
import ReBoard from '../components/ReBoard'
import BoardDetail from '../components/BoardDetail.vue'
import MenuPage from '../views/user/page/MenuPage.vue'
import UserPage from '../views/user/UserPage.vue'
import UserMyPage from '../views/user/page/UserMyPage.vue'
import store from '../store'

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
        path: 'sign',
        name: 'Sign',
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
        name: 'Menu',
        component: MenuPage,
        meta: { metaName: '메뉴'}
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
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    children: [
      // {
      //   path: 'dashBoard',
      //   name: "DashBoard",
      //   component: DashBoard,
      // },
      {
        path: 'foodManagement',
        name: 'foodManagement',
        component: FoodManagePage
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router