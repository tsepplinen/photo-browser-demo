const findPhotoFromAlbums = (id, albumId, albums) => {
  console.log("findPhotoFromAlbums", id, albumId, albums);
  
  let photo = null;
  try {
    photo = albums[albumId].photos.find((photo) => photo.id == id);
  } catch (error) {
    console.log("Error finding photo from album:", error);
    return null;
  }

  if (!photo) {
    try {
      const pages = albums[albumId].pages;
      photo = findPhotoFromPages(id, pages);
    } catch (error) {
      console.log("Error finding photo from album page", error);
    }
  }

  return photo;

  // const photos = albums[albumId].photos;
  // if (photos) {
  //   return photos.find;
  // } else {
  //   return undefined;
  // }
}

const findPhotoFromPages = (id, pages) => {
  console.log("findPhotoFromPages", id);
  
  let photo = null;
  
  if (pages) {
    console.log("pages true", pages);
  
    for(const page of pages) {
      console.log("page", page);
      if (page) {
        const found = page.find(item => Number(item.id) === id);
        if (found) {
          console.log("Found", found);
          photo = found;
          break;
        }
      }
    }

    // pages.some((page) => {
    //   const found = page.find(item => Number(item.id) === id);
    //   if (found) {
    //     console.log("Found", found);
    //     photo = found;
    //     return true;
    //   } else {
    //     console.log("not found");
    //     return false;
    //   }
    // });
  }
  return photo;
};

export default {
  getTest: (state) => () => {
    console.log("getter test");
    return state.test;
  },

  getPhotoById: (state) => (idToFind, albumId) => {
    console.log('Store: getPhotoById', idToFind, albumId);
    const id = Number(idToFind);

    let photo = findPhotoFromAlbums(id, albumId, state.albums);
    if (!photo) {
      photo = findPhotoFromPages(id, state.photoPages);
    } 
    console.dir(photo);
    if (photo && (photo.albumId != albumId)) {
      console.log("getPhotoById errori", state);
      state.error.photoError = true;
    }
    return photo;
  },
  getPhotoPage: (state) => (pageNum) => {
    console.log('Store: getPhotoPage', pageNum);
    const page = state.photoPages[pageNum];
    console.dir(page);
    return page;
  },
  getAlbumById: (state) => (id) => {
    console.log('Store: getAlbumById');
    
    // const album = state.albums.find((album) => {
    //   if (album && album.info) {
    //     const albumId = album.info.id;
    //     return (Number(albumId) === Number(id))
    //   } else {
    //     return false;
    //   }
    // });

    const album = state.albums[id];
    if (album && album.info) {
      if (album.info.id != id) {
        throw "Error: album id does not match its index."
      }
    }
    console.dir(album);
    return album;
  },
  getAlbumListPage: (state) => (page) => {
    console.log('getAlbumListPage', page);
    return state.albumPages[page];
  },
  lastLoadedPhoto: (state) => () => {
    return state.photos.length;
  }
}