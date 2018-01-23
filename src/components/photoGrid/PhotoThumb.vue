<template>
<div>
  <router-link :to="photoLink"><img :src="photo.thumbnailUrl"/></router-link>
  <!-- <p> {{ photo.title }}</p> -->
  <!-- <div>{{ photo }}</div> -->
</div>
</template>

<script>
export default {
  name: "PhotoThumb",
  props: ['photo'],
  computed: {
    photoLink() {
      return `/albums/${this.photo.albumId}/photos/${this.photo.id}`;
    }
  }
}
</script>

<style scoped>
div {
  display: inline-block;
  width: 150px;
  margin: 5px 5px;
}

div:hover {
  outline: #2c3e50 solid 3px;
}

img {
  display: block;
}
</style>
