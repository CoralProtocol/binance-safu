<template>
  <div class="balance">
    <h2 class="title">{{ msg }}</h2>
  </div>
</template>

<script>

export default {
  name: 'balance-component',
  data () {
    return {
      msg: 'Balance: 303 REEF'
    }
  }
  // components: {
  //   'balance': Balance,
  //   'scores': Scores
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

title {
  align-: left
}
</style>
