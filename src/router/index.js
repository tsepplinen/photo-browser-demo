import Vue from 'vue'
import Router from 'vue-router'
import PhotosView from '@/components/photo/PhotosView'
import PhotoDetailsView from '@/components/photo/PhotoDetailsView'
import AlbumsView from '@/components/album/AlbumsView'
import AlbumDetailsView from '@/components/album/AlbumDetailsView'
import NotFoundView from '@/components/common/NotFoundView'

import store from '../store/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/photos',
    },
    {
      path: '/photos',
      name: 'PhotosView',
      component: PhotosView,
    },
    {
      path: '/albums/:albumId(\\d+)/photos/:id(\\d+)',
      name: 'PhotoDetailsView',
      component: PhotoDetailsView,
    },
    {
      path: '/albums',
      name: 'AlbumsView',
      component: AlbumsView,
    },
    {
      path: '/albums/:id(\\d+)',
      name: 'AlbumDetailsView',
      component: AlbumDetailsView,
    },
    {
      path: '/404',
      name: 'NotFoundView',
      component: NotFoundView,
    },
    {
      path: '/*',
      name: 'NotFoundView',
      component: NotFoundView,
    },
  ]
});

router.beforeEach((to, from, next) => {
  store.dispatch('clearErrors');
  next();
});

export default router;
