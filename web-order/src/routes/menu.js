import MenuPage from '@/views/user/page/MenuPage.vue';
import MenuDetail from '@/views/user/page/MenuDetail.vue';
import MenuInformation from '@/views/user/components/menus/MenuInformation.vue';
import MenuReview from '@/views/user/components/menus/MenuReview.vue';

export default [
  {
    path: 'menu',
    name: 'menu',
    component: MenuPage,
    meta: { metaName: '주문하기'},
  },
  {
    path: 'menu/:id',
    name: 'menuDetail',
    component: MenuDetail,
    meta: { metaName: '상품 상세'},
    children: [
      {
        path: '',
        name: 'menuInfo',
        component: MenuInformation,
      },
      {
        path: 'review',
        name: 'menuReview',
        component: MenuReview,
      },
    ]
  },
  {
    path: '*',
    redirect: "/"
  }
]