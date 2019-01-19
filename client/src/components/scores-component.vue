<template>
  <div class="score container">
    <h1>Query for Trust Scores</h1>
    <!-- Container for the 'request score/alerting' functionality -->
    <div class="request container">
      <table class="table table-striped">
        <tr><td>Chain</td><td><select v-model="id_chain">
          <option value="eth">eth</option>
          <option value="btc">btc</option>
          </select></td></tr>
        <tr><td>Address</td><td><input v-model="id_address" placeholder="ex: 0x28hlm72..."></td></tr>
        <tr><td>Name</td><td><input v-model="id_name" placeholder=""></td></tr>
        <tr><td>URL</td><td><input v-model="id_url" placeholder=""></td></tr>
      </table>
        <p> </p>
        <button v-on:click="clickRequestScoreEvent">Request Score</button>
        <button v-on:click="clickRequestAlertingEvent">Request Alerting</button>

        <table class="table table-striped" v-if="reportedScore.address">
          <tr><td>Address</td><td>{{ reportedScore.address }}</td></tr>
          <tr><td>Score</td><td>{{ reportedScore.score }}</td></tr>
          <tr><td>Properties</td><td class="markdown">{{ JSON.stringify(reportedScore.properties, null, 4) }}</td></tr>
          <tr v-if="reportedScore.confirmed"><td>Confirmed</td><td>{{ reportedScore.confirmed }}</td></tr>
          <tr v-if="reportedScore.reason"><td>Reason</td><td>{{ reportedScore.reason }}</td></tr>
          <tr v-if="reportedScore.severity"><td>Severity</td><td>{{ reportedScore.severity }}</td></tr>
          <tr v-if="reportedScore.metadata"><td>Metadata</td><td class="markdown">{{ JSON.stringify(JSON.parse(reportedScore.metadata), null, 4) }}</td></tr>

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
      id_name: null,
      id_url: null,
      pending: false,
      requestScoreEvent: null,
      requestAlertingEvent: null
    }
  },
  computed: mapState([
    'reportedScore'
  ]),
  methods: {
    clickRequestScoreEvent (event) {
      // Reset event
      // this.requestScoreEvent = null
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
    },
    clickRequestAlertingEvent (event) {
      // Reset event
      // this.requestAlertingEvent = null
      const payload = {
        blockchain: this.id_chain,
        address: this.id_address,
        name: this.id_name,
        url: this.id_url
      }
      this.$store.dispatch('setAlerting', payload, {

      }, (err, result) => {
        if (err) {
          console.log(err)
        }
      })
      this.id_address = null
      this.id_chain = null
      this.id_name = null
      this.id_url = null
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
#request-score-event-succeed {
  color: green;
}
#request-score-event-failed {
  color:red;
}
#structure-succeed {
  color: green;
}
#structure-failed {
  color:red;
}

.container {
  width:800px;
}
</style>
