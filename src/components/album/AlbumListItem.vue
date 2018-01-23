<template>
  <router-link :to="`/albums/${album.id}`" ><div class="album"><h3>{{ album.title }}</h3></div></router-link>
</template>

<script>
export default {
  name: 'AlbumListItem',
  props: ['album']
}
</script>

<style>
  a {
    text-decoration: none;
  }
  
  .album:hover {
    background: lightblue;
  }

  .album:active {
    background: #2c3e50;
    color: white;
  }

  .album {
    display: block;
    border: 1px solid #2c3e50;
    border-radius: 5px;
    color: #2c3e50;
    margin: 10px 0;
    padding: 10px 0;
    text-decoration: none;
  }

  h3 {
    font-size: 125%;
    margin: 0;
    padding: 0;
  }
</style>
