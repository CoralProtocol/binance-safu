<template>
  <div class="review container" v-if="allowedToReviewFraud">
    <h1>Evidence of Fraud that Needs Review</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Address</th>
          <th>Blockchain</th>
          <th>Reason</th>
          <th>Severity</th>
          <th>Metadata</th>
          <th>Review</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="instance in instances" :key="instance._id">
          <td>{{ instance.address }}</td>
          <td>{{ instance.blockchain }}</td>
          <td>{{ instance.reason }}</td>
          <td>{{ instance.severity }}</td>
          <td>{{ instance.metadata }}</td>
          <td><a href="#" v-on:click="verifyFraudInstance(instance.blockchain+'/'+instance.address)">✅</a></td>
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
    'instances',
    'allowedToReviewFraud'
  ]),
  methods: {
    getFraudInstances (event) {
      // Reset variables
      this.fraudInstancesEvent = null
      this.$store.dispatch('loadInstances', {

      }, (err, result) => {
        if (err) {
          console.log(err)
        }
      })
    },

    verifyFraudInstance (event) {
      // Reset variables
      this.fraudInstancesEvent = null
      this.$store.dispatch('verifyFraudInstance', {
        urlSnippet: event
      }, (err, result) => {
        if (err) {
          console.log(err)
        }
      })
    }
  },
  created () {
    this.getFraudInstances()
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
