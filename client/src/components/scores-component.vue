<template>
  <div class="score container">
    <h1>Query for trust scores</h1>
    <!-- Container for the 'request score/alerting' functionality -->
    <div class="request container">
      <table class="table table-striped">
        <tr><td class="cellDescriptor">Chain</td><td><select v-model="id_chain">
          <option value="eth">eth</option>
          <option value="btc">btc</option>
          </select></td></tr>
        <tr><td class="cellDescriptor">Address</td><td><input v-model="id_address" placeholder="ex: 0x28hlm72..."></td></tr>
        <tr><td colspan="2"><button v-on:click="clickRequestScoreEvent">Request Trust Score</button></td></tr>
      </table>

        <table class="table table-striped" v-if="reportedScore.address">
          <tr><td class="cellDescriptor dynamicResult">Address</td><td class="cryptoAddress">{{ reportedScore.address }}</td></tr>
          <tr><td class="cellDescriptor dynamicResult">Score</td><td>{{ reportedScore.score }}</td></tr>
          <tr><td class="cellDescriptor dynamicResult">Properties</td><td class="markdown">{{ JSON.stringify(reportedScore.properties, null, 4) }}</td></tr>
          <tr v-if="reportedScore.confirmed"><td class="cellDescriptor dynamicResult">Confirmed</td><td>{{ reportedScore.confirmed }}</td></tr>
          <tr v-if="reportedScore.reason"><td class="cellDescriptor dynamicResult">Reason</td><td>{{ reportedScore.reason }}</td></tr>
          <tr v-if="reportedScore.severity"><td class="cellDescriptor dynamicResult">Severity</td><td>{{ reportedScore.severity }}</td></tr>
          <tr v-if="reportedScore.url"><td class="cellDescriptor dynamicResult">URL</td><td><a :href="reportedScore.url" target="_blank">{{ reportedScore.url }}</a></td></tr>
        </table>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'scores-component',
  data () {
    return {
      msg: 'Request address score/alerts',
      id_address: null,
      id_chain: 'eth',
      pending: false,
      requestScoreEvent: null
    }
  },
  computed: mapState([
    'reportedScore'
  ]),
  methods: {
    clickRequestScoreEvent (event) {
      const payload = {
        blockchain: this.id_chain,
        address: this.id_address
      }
      this.$store.dispatch('getScore', payload, {

      }, (err, result) => {
        if (err) {
          console.log(err)
        }
      })
      // Reset payload
      this.id_address = null
      this.id_chain = null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
#loader {
  position:absolute;
  left:0px;
  bottom:0px;
  width:150px;
}
#button {
  width:25px;
}

</style>
