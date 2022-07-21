import Review from '@/components/Review.vue';
import CommentList from '@/components/comment/CommentList.vue';
import BoardDetail from '@/components/BoardDetail.vue';
import BoardModify from '@/components/BoardModify.vue';

export default [
  {
    path: 'review/:id',
    name: 'review',
    component: Review,
    meta: { metaName: '리뷰 작성'}
  },
  {
    path: 'board',
    name: 'board',
    component: CommentList,
    meta: { metaName: '리뷰'}
  },
  {
    path: 'board/:id',
    name: 'boardItem',
    component: BoardDetail,
    props: true,
    meta: { metaName: '리뷰 상세보기'}
  },
  {
    path: 'board/modify/:id',
    name: 'boardModify',
    component: BoardModify,
    meta: { metaName: '리뷰 수정'},
  },
]