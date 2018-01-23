<template>
  <div v-if="album">
    <h2>Album: {{ album.info.title }}</h2>

    <PageLinker :currentPage="page"
                :first="1" 
                :last="lastPage" 
                :linkBuilder="pageLinkBuilder" />

    <PhotoGrid v-if="photos" :photos="photos" />
    <div v-else class="loading">Loading...</div>

    <PageLinker :currentPage="page"
                :first="1" 
                :last="lastPage" 
                :linkBuilder="pageLinkBuilder" />

  </div>
  <div class="loading" v-else>Loading...</div>
</template>

<script>

import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import PhotoGrid from '@/components/photoGrid/PhotoGrid'
import PageLinker from "@/components/common/PageLinker";

export default {
  name: 'AlbumDetailsView',
  computed: {
    albumId() {
      return this.$route.params.id;
    },
    album() {
      const album = this.getAlbumById(this.albumId);
      return album;
    },
    page() {
      return this.$route.query.page || 1;
    },
    lastPage() {
      return this.album.lastPage || 1;
    },
    photos() {
      return this.album.pages[this.page];
    },
    ...mapGetters(['getAlbumById']),
  },
  methods: {
    ...mapActions([
      'fetchAlbum',
    ]),
    pageLinkBuilder(page) {
      return `?page=${page}`;
    }
  },
  mounted() {
    const id = this.albumId;
    const page = this.page;
    this.fetchAlbum({id, page});
  },
  beforeRouteUpdate(to, from, next) {
    const id = to.params.id;
    const page = Number(to.query.page) || 1;
    this.fetchAlbum({id, page});
    next();
  },
  components: {
    PhotoGrid,
    PageLinker,
  },
}
</script>

<style scoped>
  div.loading {
    padding: 20px 0;
  }
</style>
