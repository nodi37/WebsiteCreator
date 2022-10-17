import Vue from 'vue'
import VueRouter from 'vue-router'

import AddSubpageRoute from '@/components/Routes/AddSubpageRoute.vue';
import ArticlesRoute from '@/components/Routes/ArticlesRoute.vue';
import GalleriesRoute from '@/components/Routes/GalleriesRoute.vue';
import GlobalRoute from '@/components/Routes/GlobalRoute.vue';
import LayoutManagerRoute from '@/components/Routes/LayoutManagerRoute.vue';
import LoginView from '@/views/LoginView';
import MainView from '@/views/MainView';
import SubpageView from '@/views/SubpageView';

Vue.use(VueRouter)

const routes = [
  {
    path: '/panel',
    name: 'panel',
    component: () => import('@/views/PanelView.vue'),
    children: [
      {
        path: 'global-template',
        name: 'globalTemplate',
        component: GlobalRoute
      },
      {
        path: 'layout-manager/:layoutName',
        name: 'layoutManager',
        component: LayoutManagerRoute
      },
      {
        path: 'articles',
        name: 'articles',
        component: ArticlesRoute
      },
      {
        path: 'galleries',
        name: 'galleries',
        component: GalleriesRoute
      },
      {
        path: 'add-subpage',
        name: 'addSubpage',
        component: AddSubpageRoute
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    name: 'main',
    component: MainView,
    children: [
      {
        path: ':layoutName',
        name: 'subpageView',
        component: SubpageView
      },
    ]
  },

  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
