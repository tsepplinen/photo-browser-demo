import Vue from 'vue';

import types from './mutation-types'
import defaultErrorState from "./defaultErrorState";

export default {
  [types.RECEIVE_PHOTO](store, payload) {
    console.log('Store: Receive Photo', payload);
    const id = payload.id;
    const albumId = payload.albumId;
    const album = store.albums[albumId] || { info: undefined, pages: [], photos: [] };
    album.photos.push(payload);
    if (store.albums) {
      Vue.set(store.albums, albumId, album);  
    }
  },
  [types.RECEIVE_PHOTO_PAGE](store, payload) {
    console.log('Store: Receive PhotoPage');
    console.dir(payload);
    const id = payload.id;
    Vue.set(store.photoPages, id, payload.photos);
    Vue.set(store,'photosLastPage', payload.lastPage);
  },
  [types.RECEIVE_ALBUM_INFO](store, info) {
    console.log('Store: Receive Album Info', info);
    
    let album = store.albums[info.id] || { info: undefined, pages: [], photos: [] };
    album.info = info;
    
    Vue.set(store.albums, album.info.id, album);
  },
  [types.RECEIVE_ALBUM_PHOTO_PAGE](store, payload) {
    console.log('Store: Receive Album PhotoPage', payload);
    let album = store.albums[payload.id] || { info: undefined, pages: [], photos: [] };
    Vue.set(store.albums, payload.id, album);
    Vue.set(album.pages, payload.page, payload.photoPage);
    Vue.set(album,'lastPage', payload.lastPage);
  },
  [types.RECEIVE_ALBUM_LIST_PAGE](store, payload) {
    console.log('Store: Receive AlbumListPage', payload);
    Vue.set(store.albumPages, payload.page, payload.albums);
    Vue.set(store, 'albumListLastPage', payload.lastPage);
  },
  [types.ERROR_FETCH_PHOTO](store) {
    Vue.set(store.error, 'photoError', true);
  },
  [types.CLEAR_ERRORS](store) {
    console.log("Clear", defaultErrorState);
    const replacement = { ...defaultErrorState}
    Vue.set(store, 'error', replacement);
  }
};