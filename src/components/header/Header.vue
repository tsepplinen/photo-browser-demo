<template>
  <header>
    <h1 class="title">Photo Browser</h1>
    <NavigationBar/>
  </header>
</template>

<script>

import NavigationBar from '@/components/navigation/NavigationBar'

export default {
  name: 'Header',
  components: {
    NavigationBar,
  }
}
</script>

<style scoped>
  
  header {
    height: 100px;
    display: grid;
    grid-template-columns: 3fr 7fr;
    grid-template-rows: 100%;
    color: white;
    /* text-align: left; */
    align-items: center;
    justify-items: center;
    width: 100%;
    background: #2c3e50;
    margin: 0;
    /* padding: 20px 10px; */
  }

  header h1.title {
    /* display: inline-block; */
    /* background: red; */
    justify-self: start;
    /* align-self: end; */
    /* text-align: center; */
    /* height: 100%; */
    margin: 0 0 0 20px;
    padding: 10px;
  }  

</style>
