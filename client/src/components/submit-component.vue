<template>
  <div class="submit container">
    <h1>{{ msg }}</h1>
    <!-- Container for the 'getNodeViewCount' functionality -->
    <div class="getNodeViewCount container">
      Node's ID: <input v-model="id_get_view_count" placeholder="ex: 0x228lz7g...">
      <button v-on:click="clickGetViewCount">Get View Count</button>
      <img v-if="pending" id="loader" src="https://loading.io/spinners/double-ring/lg.double-ring-spinner.gif">
      <div class="event" v-if="getViewCountEvent">
        <p v-if="getViewCountEvent.viewCount" id="get-view-count-succeed"><i aria-hidden="true" class="fa fa-check"></i> This node has been viewed {{getViewCountEvent._views}} times.</p>
        <p v-else id="get-view-count-failed"><i aria-hidden="true" class="fa fa-times"></i> Error: Node's view count not returned.</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'submit-component',
  data () {
    return {
      msg: 'Submit component'
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
