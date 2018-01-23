<template>
  <div class="album-list">
    <AlbumListItem v-for="album in albums" :key="album.id" :album="album"/>
  </div>
</template>

<script>
import AlbumListItem from '@/components/album/AlbumListItem'

export default {
  name: 'AlbumList',
  components: {
    AlbumListItem,
  },
  props: ['albums'],
}

</script>

<style scoped>
  .album-list {
    padding: 0 10%;
  }
</style>
