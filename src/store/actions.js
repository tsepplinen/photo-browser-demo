import api from '../api/api'
import config from '../config'
import types from './mutation-types'

export default {
  async fetchPhotoPage ({ commit, getters}, pageNum) { 
    
    const response = await api.getPhotoPage(pageNum-1);
    const total = response.headers['x-total-count'];
    const lastPage = Math.ceil(total / config.PHOTOS_PER_PAGE);
    const payload = {
      id: pageNum,
      photos: response.data,
      lastPage,
    }
    // commit('receivePhotoPage', payload);
    commit(types.RECEIVE_PHOTO_PAGE, payload);
    console.log('Store: fetchPhotos', lastPage);
  },

  async fetchAlbumInfo({commit, getters}, id) {
    const album = getters.getAlbumById(id);
    if (!(album && album.info)) {
      const info = await api.getAlbumInfo(id);
      // commit('receiveAlbumInfo', info.data);
      commit(types.RECEIVE_ALBUM_INFO, info.data);
    }
  },

  async fetchAlbum ({commit, getters}, params) {
    console.log('Store: fetchAlbum', params);
    const id = params.id;
    const page = params.page;
    const promises = [{data: null}, {data: null}];

    const album = getters.getAlbumById(id);
    
    // Check if album info
    if (!album || !album.info) {
      promises[0] = api.getAlbumInfo(id);
    }
    // Check if photos page
    if (!album || !album.pages || !album.pages[page]) {
      promises[1] = api.getAlbumPhotoPage(id, page);
    }

    const results = await Promise.all(promises);
    console.log("Promise.all results", results);
    const info = results[0].data;
    const photoPage = results[1].data;

    if (info) {
      // commit('receiveAlbumInfo', info);
      commit(types.RECEIVE_ALBUM_INFO, info);
    }

    if(photoPage) {
      const total = results[1].headers["x-total-count"];
      const lastPage = Math.ceil(total / config.PHOTOS_PER_ALBUM_PHOTO_PAGE);
      const payload = {id, page, photoPage, lastPage};
      // commit('receiveAlbumPhotoPage', payload);
      commit(types.RECEIVE_ALBUM_PHOTO_PAGE, payload);
    }
  },

  async fetchAlbumListPage({commit}, page) {
    const start = (page - 1) * config.ALBUMS_PER_LIST_PAGE;
    const limit = config.ALBUMS_PER_LIST_PAGE;
    const result = await api.getAlbumListPage(start, limit);

    const total = result.headers["x-total-count"];
    const lastPage = Math.ceil(total / config.ALBUMS_PER_LIST_PAGE);
    console.log('Store: fetchAlbumListPage', page);
    // commit('receiveAlbumListPage', {page: page, albums: result.data, lastPage: lastPage});
    commit(types.RECEIVE_ALBUM_LIST_PAGE, {page: page, albums: result.data, lastPage: lastPage});
  },

  async fetchPhotoById ({commit, getters, dispatch}, params) {
    console.log('Store: fetchPhotoById', params);
    const id = params.id;
    const albumId = params.albumId;

    // check if photo is cached, fetch if not
    let photo = getters.getPhotoById(id, albumId);
    console.dir(photo);
    if (!photo) {
      console.log('Store: fetchPhotoById !photo', id, albumId);
      const result = await Promise.all(
        [api.getPhoto(id),
          dispatch('fetchAlbumInfo', albumId)]
        );
        photo = result[0];
        if (photo.data.albumId == albumId) {
          // commit('receivePhoto', photo.data);
          commit(types.RECEIVE_PHOTO, photo.data);
        } else {
          // commit('errorFetchPhoto', true);
          commit(types.ERROR_FETCH_PHOTO, true);
        }
      } else {
        dispatch('fetchAlbumInfo', albumId);
    }
    // Album info is also needed

  },
  clearErrors ({commit}) {
    // commit('clearErrors');
    commit(types.CLEAR_ERRORS);
  },
};