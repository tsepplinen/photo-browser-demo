<template>
  <div>
    <h1>Albums</h1>
    <AlbumList :albums="albums"/>
    <PageLinker 
      :currentPage="page" 
      :first="1" 
      :last="lastPage" 
      :linkBuilder="pageLinkBuilder" />
  </div>
</template>

<script>

import { mapActions, mapGetters } from "vuex";
import AlbumList from '@/components/album/AlbumList'
import PageLinker from '@/components/common/PageLinker'
import api from '../../api/api'

export default {
  name: 'AlbumsView',
  components: {
    AlbumList,
    PageLinker,
  },
  computed: {
    albums() {
      return this.getAlbumListPage(this.page);
    },
    page() {
      return this.$route.query.page || 1;
    },
    lastPage() {
      return this.$store.state.albumListLastPage;
    },
    end() {
      return this.start + 5;
    },
    ...mapGetters(['getAlbumListPage']),
  },
  methods: {
    ...mapActions(['fetchAlbumListPage']),
    pageLinkBuilder(page) {
      return `/albums?page=${page}`;
    }
  },
  mounted() {
    this.fetchAlbumListPage(this.page);
  },
  beforeRouteUpdate(to, from, next) {
    const page = to.query.page || 1
    this.fetchAlbumListPage(page);
    next();
  }
}
</script>

<style scoped>

</style>

