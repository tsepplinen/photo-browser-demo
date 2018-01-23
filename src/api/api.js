import axios from '../../node_modules/axios/dist/axios'
import config from '../config'

const baseUrl = 'http://jsonplaceholder.typicode.com';

export default {
  // gets a page of photos
  getPhotoPage(pageNum) {

    const start = pageNum * config.PHOTOS_PER_PAGE;
    const limit = config.PHOTOS_PER_PAGE;

    const url = `${baseUrl}/photos?_start=${start}&_limit=${limit}`
    console.log(url);
    
    return axios.get(url);
  },

  
  // gets a page of album for listing
  getAlbumListPage(start, limit) {
    return axios.get(`${baseUrl}/albums?_start=${start}&_limit=${limit}`);
  },

  
  // gets a single photo
  getPhoto(id) {
    const url = `${baseUrl}/photos/${id}`
    console.log(url);
    return axios.get(url);
  },

  
  // gets a single album
  getAlbumInfo(id) {
    const url = `${baseUrl}/albums/${id}`;
    console.log(url);
    return axios.get(url);
  },

  // gets a page of photos inside an album
  getAlbumPhotoPage(id, pageNum) {
    
    const page = (pageNum - 1 < 0) ? 0 : pageNum - 1;
    const start = page * config.PHOTOS_PER_ALBUM_PHOTO_PAGE;
    const limit = config.PHOTOS_PER_ALBUM_PHOTO_PAGE;

    const url = `${baseUrl}/albums/${id}/photos?_start=${start}&_limit=${limit}`;
    console.log(url);
    return axios.get(url);
  },
}