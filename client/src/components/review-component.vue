<template>
  <div class="review container">
    <!-- <h1>{{ msg }}</h1> -->
    <button v-on:click="clickGetFraudInstances">Get fraud instances</button>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Address</th>
          <th>Blockchain</th>
          <th>Reason</th>
          <th>Severity</th>
          <th>Metadata</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="instance in instances" :key="instance._id">
          <td>{{ instance._id }}</td>
          <td>{{ instance.address }}</td>
          <td>{{ instance.blockchain }}</td>
          <td>{{ instance.reason }}</td>
          <td>{{ instance.severity }}</td>
          <td>{{ instance.metadata }}</td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'review-component',
  data () {
    return {
      msg: 'REVIEW component',
      fraudInstancesEvent: null
    }
  },
  // mounted () {
  //   this.$store.dispatch('loadInstances')
  // },
  computed: mapState([
    'instances'
  ]),
  methods: {
    clickGetFraudInstances (event) {
      // Reset variables
      this.fraudInstancesEvent = null
      this.$store.dispatch('loadInstances', {

      }, (err, result) => {
        if (err) {
          console.log(err)
        }
      })
    }
  }
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
