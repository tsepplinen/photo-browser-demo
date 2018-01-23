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
    color: white;
    background: #2c3e50;
    height: 100px;
    width: 100%;
    margin: 0;
   
    display: grid;
    grid-template-columns: 3fr 7fr;
    grid-template-rows: 100%;
    align-items: center;
    justify-items: center;
  }

  header h1.title {
    justify-self: start;
    margin: 0 0 0 20px;
    padding: 10px;
  }  

</style>
