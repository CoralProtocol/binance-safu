<template>
  <div class="review">
    <h1>{{ msg }}</h1>
  </div>

</template>

<script>

export default {
  name: 'review-component',
  data () {
    return {
      msg: 'REVIEW component'
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
</style>
