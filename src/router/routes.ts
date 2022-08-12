import { RouteRecordRaw } from "vue-router"

const routes:Array<RouteRecordRaw> = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    name:'login',
    path:'/login',
    component:()=>import ('../views/Login.vue')
  },
  {
    name:'index',
    path:'/index',
    component:()=>import ('../views/Index.vue'),
    children:[
      {
        path:'/index',
        redirect:'/index/home'
      },
      {
        name:'home',
        path:'/index/home',
        component:()=>import ('../views/main/Home.vue'),
      },
      {
        name:'userManage', 
        path:'/index/userManage',
        component:()=>import ('../views/main/UserManage.vue'),
      },
      {
        name:'authorityManage',
        path:'/index/authorityManage',
        component:()=>import ('../views/main/AuthorityManage.vue'),
      }
    ]
  }
]

export default routes