import productlist from '../views/product/list.vue'
import productPreview from '../views/product/preview.vue'
import createproduct from '../views/product/create.vue'

const routes = [
  { path: '/about', name: 'about', component: () => import(/* webpackChunkName: "about" */ '@/views/About') },
  {
    path: '/',
    name: 'index',
    component: productlist
  },
  {
    path: '/product/list',
    name: 'productlist',
    component: productlist
  },
  {
    path: '/product/create',
    name: 'createproduct',
    component: createproduct
  },
  {
    path: '/product/preview/:productId',
    name: 'productPreview',
    component: productPreview,
    props: true //表示带参数
  }
];

export default routes;
