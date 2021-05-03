import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/account/login.vue'
import layout from '@/views/_layout'
import _temp from '@/views/_temp'
import overview from '@/views/workbench/overview'
const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/index',     
    component: layout,
    name:'layout', 
    redirect:'/product/list',
    children:[        
      {
        path: '/workbench/overview',
        component: overview,         
      },
      {
        path:'/product/list',
        name:'product',       
        component: _temp,         
      },
      {
        path:'/product/create',
        name:'create',       
        component: _temp,         
      },
    ]     
  }
]

const router = createRouter({
  mode: 'history',
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
