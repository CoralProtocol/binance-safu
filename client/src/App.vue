<template>
  <div id="app">
    <img src="./assets/logo_coral-protocol.png" height="133" width="339">
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
</style>
