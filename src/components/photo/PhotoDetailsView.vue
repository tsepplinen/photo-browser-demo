<template>
  <div v-if="photo && !error">
    <h2>Name: {{ photo.title }}</h2>
    <h4><router-link :to="albumLink">Album:
      <span v-if="album.info">{{ album.info.title }}</span>
      <span v-else>Loading...</span>
    </router-link></h4>
    <img :src="photo.url">
  </div>

  <div v-else-if="error" class="loading">Photo not found!</div>

  <div v-else class="loading">Loading...</div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import PhotoGrid from '@/components/photoGrid/PhotoGrid'

export default {
  name: 'PhotoDetailsView',
  computed: {
    photoId() {
      return this.$route.params.id;
    },
    albumId() {
      return this.$route.params.albumId;
    },
    photo() {
      const photo = this.getPhotoById(this.photoId, this.albumId);
      return photo;
    },
    albumLink() {
      return `/albums/${this.albumId}`;
    },
    album() {
      const album = this.getAlbumById(this.albumId);
      return album;
    },
    error() {
      return this.$store.state.error.photoError;
    },
    ...mapGetters([
      'getPhotoById',
      'getAlbumById'
    ]),
  },
  methods: {
    ...mapActions([
      'fetchPhotoById',
    ]),
  },
  mounted() {
    this.fetchPhotoById({id: this.photoId, albumId: this.albumId});
  },
  beforeRouteUpdate(to, from, next) {
    const id = to.params.id;
    const albumId = to.params.albumId;
    this.fetchPhotoById({id, albumId}); 
    next();
  },
  components: {
    PhotoGrid,
  },
}
</script>

<style scoped>
  h2 {
    margin: 20px 0 0 0;
  }

  div.loading {
    margin: 20px 0;
  }
</style>
