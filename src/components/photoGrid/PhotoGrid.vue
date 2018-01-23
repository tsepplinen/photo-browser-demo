<template>
  <div>
    <PhotoThumb v-for="photo in photos" :key="photo.id" :photo="photo"/>
  </div>
</template>

<script>

import PhotoThumb from './PhotoThumb'

export default {
  name: 'PhotoGrid',
  props: ['photos'],
  components: {
    PhotoThumb,
  }
}
</script>

<style scoped>

</style>


