<template>
  <div class="navigation">
    <NavigationLink url="/photos">Photos</NavigationLink>
    <NavigationLink url="/albums">Albums</NavigationLink>
  </div>  
</template>

<script>

import NavigationLink from '@/components/navigation/NavigationLink'

export default {
  name: 'NavigationBar',
  components: {
    NavigationLink,
  }
}
</script>

<style scoped>
  div.navigation {
    padding: 10px;
    margin-right: 20px;
    justify-self: stretch;
    text-align: right;
    /* display: grid; */
  }
</style>
