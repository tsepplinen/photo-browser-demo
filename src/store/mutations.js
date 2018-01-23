import Vue from 'vue';

import types from './mutation-types'
import defaultErrorState from "./defaultErrorState";

export default {
  // Stores received photo.
  [types.RECEIVE_PHOTO](store, payload) {
    const id = payload.id;
    const albumId = payload.albumId;
    const album = store.albums[albumId] || { info: undefined, pages: [], photos: [] };
    album.photos.push(payload);
    if (store.albums) {
      Vue.set(store.albums, albumId, album);  
    }
  },

  // Stores received page of photos.
  [types.RECEIVE_PHOTO_PAGE](store, payload) {
    const id = payload.id;
    Vue.set(store.photoPages, id, payload.photos);
    Vue.set(store,'photosLastPage', payload.lastPage);
  },

  // Stores received album info.
  [types.RECEIVE_ALBUM_INFO](store, info) {
    let album = store.albums[info.id] || { info: undefined, pages: [], photos: [] };
    album.info = info;
    Vue.set(store.albums, album.info.id, album);
  },

  // Stores received album photo page.
  [types.RECEIVE_ALBUM_PHOTO_PAGE](store, payload) {
    let album = store.albums[payload.id] || { info: undefined, pages: [], photos: [] };
    Vue.set(store.albums, payload.id, album);
    Vue.set(album.pages, payload.page, payload.photoPage);
    Vue.set(album,'lastPage', payload.lastPage);
  },

  // Stores received album list page.
  [types.RECEIVE_ALBUM_LIST_PAGE](store, payload) {
    Vue.set(store.albumPages, payload.page, payload.albums);
    Vue.set(store, 'albumListLastPage', payload.lastPage);
  },

  // Sets photo fething error flag.
  [types.ERROR_FETCH_PHOTO](store) {
    Vue.set(store.error, 'photoError', true);
  },

  // Clears errors from store.
  [types.CLEAR_ERRORS](store) {
    const replacement = { ...defaultErrorState}
    Vue.set(store, 'error', replacement);
  }
};