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
  text-align: right;
}

input, select {
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

.container {
  width:640px;
  margin-top: 40px;
}

a {
  text-decoration: none;
  color: #CE0B24;
}

.cellDescriptor {
  text-align: left;
  width: 200px;
}

.dynamicResult {
  font-style: italic;
}

.cryptoAddress {
  font-family: "Lucida Console", Monaco, monospace;
  font-size: 0.8rem;
}

/* General Buttons */
button {
  width: 200px;
  height: 20px;
  background: #CE0B24;
  border: none;
  border-radius: 5px;
  border-bottom: 4px solid #CE0B24;
  color: #fbfbfb;
  font-weight: 600;
  text-shadow: 1px 1px 1px rgba(0,0,0,.4);
  text-align: left;
  text-indent: 5px;
  box-shadow: 0px 3px 0px 0px rgba(0,0,0,.2);
  cursor: pointer;

/* Just for presentation */
  margin: 0 auto;
  margin-bottom: 20px;
}
button:active {
  box-shadow: 0px 2px 0px 0px rgba(0,0,0,.2);
  top: 1px;
}

button:after {
  content: "";
  width: 0;
  height: 0;
  display: block;
  border-top: 10px solid #187dbc;
  border-bottom: 10px solid #187dbc;
  border-left: 16px solid transparent;
  border-right: 20px solid #187dbc;
  position: absolute;
  opacity: 0.6;
  right: 0;
  top: 0;
  border-radius: 0 5px 5px 0;
}

</style>
