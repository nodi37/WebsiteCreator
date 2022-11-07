import Vue from 'vue'
import VueRouter from 'vue-router'

import AddSubpageRoute from '@/components/Routes/AddSubpageRoute.vue';
import ArticlesRoute from '@/components/Routes/ArticlesRoute.vue';
import GlobalRoute from '@/components/Routes/GlobalRoute.vue';
import LayoutManagerRoute from '@/components/Routes/LayoutManagerRoute.vue';
import EditArticleRoute from '@/components/Routes/EditArticleRoute.vue';
import MainView from '@/views/MainView';

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
        path: 'article/edit',
        name: 'editArticle',
        component: EditArticleRoute
      },
      {
        path: 'add-subpage',
        name: 'addSubpage',
        component: AddSubpageRoute
      },
    ]
  },
  {
    path: '/',
    name: 'main',
    component: MainView,
    children: [
      {
        path: ':layoutName',
        name: 'subpageView',
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
