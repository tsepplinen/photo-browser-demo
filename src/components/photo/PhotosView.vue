<template>
  <div>
    <h1>{{ viewTitle }}</h1>
    <div v-if="photos">
      <PageLinker :currentPage="page" :first="1" :last="lastPage" :linkBuilder="pageLinkBuilder" />
      <PhotoGrid :photos="photos"/>
      <PageLinker :currentPage="page" :first="1" :last="lastPage" :linkBuilder="pageLinkBuilder" />
    </div>
    <div v-else class="loading">Loading...</div>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import PhotoGrid from '@/components/photoGrid/PhotoGrid'
import PageLinker from "@/components/common/PageLinker";

export default {
  name: 'PhotosView',
  data () {
    return {
      viewTitle: 'Photos',
    }
  },
  computed: {
    userID() {
      return this.$route.params.id;
    },
    photos() {
      console.log("PhotosView photos");
      return this.getPhotoPage(this.page);
    },
    page() {
      return Number(this.$route.query.page) || 1;
    },
    lastPage() {
      return this.$store.state.photosLastPage;
    },
    ...mapGetters(['getPhotoPage']),
  },
  methods: {
    ...mapActions([
      'fetchPhotoPage',
    ]),
    pageLinkBuilder(page) {
      return `/photos?page=${page}`;
    }
  },
  mounted() {
    console.log("PhotosView mounted");
    this.fetchPhotoPage(this.page);
    
  },
  beforeRouteUpdate(to, from, next) {
    console.log("PhotosView b+eforeRouteUpdate");
    const page = to.query.page;
    this.fetchPhotoPage(page);
    next();
  },
  components: {
    PhotoGrid,
    PageLinker,
  },
}
</script>

<style scoped>
button {
  margin: 20px;
  padding: 5px 20px;
}
</style>
