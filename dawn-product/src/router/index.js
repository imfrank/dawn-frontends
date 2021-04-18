import { createRouter, createWebHistory } from 'vue-router'
import productlist from '../views/product/list.vue'
import productPreview from '../views/product/preview.vue'
const routerHistory = createWebHistory();

const router = createRouter({
    history: routerHistory,  // history
    routes:[
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
          path: '/product/preview/:productId',
          name: 'productPreview',
          component: productPreview,
          props: true //表示带参数
        }
      ]
});

export default router;
