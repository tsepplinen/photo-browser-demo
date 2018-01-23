import api from '../api/api'
import config from '../config'
import types from './mutation-types'

export default {
  async fetchPhotoPage ({commit, getters}, pageNum) { 
    
    if (!getters.getPhotoPage(pageNum)) {
      const response = await api.getPhotoPage(pageNum-1);
      const total = response.headers['x-total-count'];
      const lastPage = Math.ceil(total / config.PHOTOS_PER_PAGE);
      const payload = {
        id: pageNum,
        photos: response.data,
        lastPage,
      }
      commit(types.RECEIVE_PHOTO_PAGE, payload);
    }
  },

  async fetchAlbumInfo({commit, getters}, id) {
    const album = getters.getAlbumById(id);
    if (!(album && album.info)) {
      const info = await api.getAlbumInfo(id);
      commit(types.RECEIVE_ALBUM_INFO, info.data);
    }
  },

  async fetchAlbum ({commit, getters}, params) {
    const id = params.id;
    const page = params.page;
    const promises = [{data: null}, {data: null}];

    const album = getters.getAlbumById(id);
    
    // Check if album info exists
    if (!album || !album.info) {
      promises[0] = api.getAlbumInfo(id);
    }
    // Check if photos page exists
    if (!album || !album.pages || !album.pages[page]) {
      promises[1] = api.getAlbumPhotoPage(id, page);
    }

    const results = await Promise.all(promises);
    const info = results[0].data;
    const photoPage = results[1].data;

    if (info) {
      commit(types.RECEIVE_ALBUM_INFO, info);
    }

    if(photoPage) {
      const total = results[1].headers["x-total-count"];
      const lastPage = Math.ceil(total / config.PHOTOS_PER_ALBUM_PHOTO_PAGE);
      const payload = {id, page, photoPage, lastPage};
      commit(types.RECEIVE_ALBUM_PHOTO_PAGE, payload);
    }
  },

  async fetchAlbumListPage({commit}, page) {
    const start = (page - 1) * config.ALBUMS_PER_LIST_PAGE;
    const limit = config.ALBUMS_PER_LIST_PAGE;
    const result = await api.getAlbumListPage(start, limit);

    const total = result.headers["x-total-count"];
    const lastPage = Math.ceil(total / config.ALBUMS_PER_LIST_PAGE);
    commit(types.RECEIVE_ALBUM_LIST_PAGE, {page: page, albums: result.data, lastPage: lastPage});
  },

  async fetchPhotoById ({commit, getters, dispatch}, params) {
    const id = params.id;
    const albumId = params.albumId;

    // check if photo is cached, fetch if not
    let photo = getters.getPhotoById(id, albumId);
    if (!photo) {
      const result = await Promise.all([
        api.getPhoto(id),
        dispatch('fetchAlbumInfo', albumId)
      ]);

      photo = result[0];
      if (photo.data.albumId == albumId) {
        commit(types.RECEIVE_PHOTO, photo.data);
      } else {
        // Album id's do not match
        commit(types.ERROR_FETCH_PHOTO, true);
      }
    } else {
      dispatch('fetchAlbumInfo', albumId);
    }
  },
  clearErrors ({commit}) {
    commit(types.CLEAR_ERRORS);
  },
};