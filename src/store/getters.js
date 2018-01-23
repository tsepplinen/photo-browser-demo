// Finds a photo stored in albums
const findPhotoFromAlbums = (id, albumId, albums) => {
  
  let photo = null;
  try {
    photo = albums[albumId].photos.find((photo) => photo.id == id);
  } catch (error) {
    return null;
  }

  if (!photo) {
    try {
      const pages = albums[albumId].pages;
      photo = findPhotoFromPages(id, pages);
    } catch (error) {
      // Do nothing
    }
  }

  return photo;
}

// Finds a photo stored in pages
const findPhotoFromPages = (id, pages) => {
  let photo = null;
  
  if (pages) {
    for(const page of pages) {
      if (page) {
        const found = page.find(item => Number(item.id) === id);
        if (found) {
          photo = found;
          break;
        }
      }
    }
  }
  return photo;
};

export default {


  // Gets photo by id from albums or pages
  getPhotoById: (state) => (idToFind, albumId) => {
    const id = Number(idToFind);

    let photo = findPhotoFromAlbums(id, albumId, state.albums);
    if (!photo) {
      photo = findPhotoFromPages(id, state.photoPages);
    } 

    // If photos albumId does not match
    if (photo && (photo.albumId != albumId)) {
      state.error.photoError = true;
    }
    return photo;
  },

  // Gets a page of photos from store.
  getPhotoPage: (state) => (pageNum) => {
    console.log('Store: getPhotoPage', pageNum);
    const page = state.photoPages[pageNum];
    console.dir(page);
    return page;
  },

  // Gets an album by id from store
  getAlbumById: (state) => (id) => {
    const album = state.albums[id];
    if (album && album.info) {
      if (album.info.id != id) {
        throw "Error: album id does not match its index."
      }
    }
    return album;
  },

  // Gets a page of albums for album listing
  getAlbumListPage: (state) => (page) => {
    return state.albumPages[page];
  },
}