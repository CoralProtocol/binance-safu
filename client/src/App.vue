<template>
  <div id="app">
    <img src="./assets/logo_coral-protocol.png" height="133" width="339" class="hero" >
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 10px;
}

.hero {
  display:block;
  margin: auto;
}

h1, h2 {
  text-align: center;
}

.container {
  margin-left:auto;
  margin-right:auto;
}

table {
  width:-webkit-fill-available;
}

.markdown {
  font-family: "Lucida Console", Monaco, monospace;
  font-size: 0.8rem;
  line-height: 1.2;
  text-align: left;
  background-color: #dfdfdf;
  color: #8b0000;
}

</style>
