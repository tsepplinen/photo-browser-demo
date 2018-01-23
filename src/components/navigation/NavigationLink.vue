<template>
  <router-link :to="url" tag="div" class="link"><slot></slot></router-link>
</template>

<script>
export default {
  name: 'NavigationLink',
  props: ['url'],
}
</script>

<style scoped>
  div.link {
    display: inline-block;
    width: 20%;
    text-align: center;
    border: 1px solid white;
    border-radius: 5px;
    padding: 10px 5px;
    cursor: pointer;
  }

  div.link a {
    color: white;
    text-decoration: none;
    width: 100%;
    height: 100%;
  }
  div.router-link-active {
    color: #2c3e50;
    background: lightblue;
    font-weight: bold;
  }
</style>
