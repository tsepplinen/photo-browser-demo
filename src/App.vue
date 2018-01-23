<template>
  <div id="app">
    <Header />
    <section>
      <router-view />
    </section>
    <Footer />
  </div>
</template>

<script>
import Header from './components/header/Header'
import Footer from './components/footer/Footer'

export default {
  name: 'app',
  components: {
    Header,
    Footer,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}

html, body {
  margin: 0;
}

section {
  max-width: 1000px;
  margin: 0 auto 100px auto;
}

</style>
