import UserPage from '@/views/user/UserPage.vue'
import MyArticlePage from '@/views/user/page/MyArticlePage.vue';
import SignPage from '@/views/user/page/SignPage.vue';
import LoginPage from '@/views/user/page/LoginPage.vue';
import UserModify from '@/views/user/page/Modify.vue';
import UserInfo from '@/views/user/page/UserInfoPage.vue';
import MyOrderHistory from '@/views/user/page/MyOrderHistory.vue'
import ShopInfo from '@/views/user/page/ShopInfo.vue'

import menu from '@/routes/menu.js';
import review from '@/routes/review.js'
import store from '@/store'

const beforeAuth = isAuthenticated => (from, to, next) => {
  const isAuth = store.getters['user/isAuth'];
  if ((isAuth && isAuthenticated) || (!isAuth && !isAuthenticated)) {
    return next();
  } else {
    alert("로그인이 필요한 메뉴입니다.");
    next('/user/login');
  }
}

export default [
  {
    path: '/user',
    name: 'user',
    component: UserPage,
    children: [
      {
        path: 'myarticle',
        name: 'myarticle',
        component: MyArticlePage,
        meta: { metaName: '관심 리뷰'}
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
      ...menu,
      ...review,
      {
        path: 'mypage',
        name: 'mypage',
        component: MyOrderHistory,
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
]