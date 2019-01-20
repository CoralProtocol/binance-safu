<template>
  <div class="review container" v-if="allowedToReviewFraud">
    <h1>Evidence of Fraud That Needs Review</h1>
      <div>
        <p align="center" v-if="allowedToReviewFraud"><i>🔍 You are authorized to review evidence of fraud</i></p>
      </div>
    <table class="table table-striped">
        <div v-for="instance in instances" :key="instance._id">
        <hr>
        <tr><td class="cellDescriptor dynamicResult">Address</td><td class="cryptoAddress">{{ instance.address }}</td></tr>
        <tr><td class="cellDescriptor dynamicResult">Blockchain</td><td>{{ instance.blockchain }}</td></tr>
        <tr><td class="cellDescriptor dynamicResult">Reason</td><td>{{ instance.reason }}</td></tr>
        <tr><td class="cellDescriptor dynamicResult">Severity</td><td>{{ instance.severity }}</td></tr>
        <tr><td class="cellDescriptor dynamicResult">URL</td><td><a :href="instance.url" target="_blank">{{ instance.url }}</a></td></tr>
        <tr><td class="cellDescriptor dynamicResult">Verify</td><td><a href="#" v-on:click="verifyFraudInstance(instance.blockchain+'/'+instance.address)">✅</a></td></tr>
        </div>
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

</style>
