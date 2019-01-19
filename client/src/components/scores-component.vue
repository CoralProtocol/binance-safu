<template>
  <div class="score container">
    <h1>Query for Trust Scores</h1>
    <!-- Container for the 'request score/alerting' functionality -->
    <div class="request container">
      Chain:
      <select v-model="id_chain">
        <option value="eth">eth</option>
        <option value="btc">btc</option>
      </select>&nbsp;
      Address: <input v-model="id_address" placeholder="ex: 0x28hlm72...">
      Name: <input v-model="id_name" placeholder="">
      URL: <input v-model="id_url" placeholder="">
        <p> </p>
        <button v-on:click="clickRequestScoreEvent">Request Score</button>
        <button v-on:click="clickRequestAlertingEvent">Request Alerting</button>

      <p> {{ status }} </p>

        <div v-if="reportedScore">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Address</th>
                <th>Score</th>
                <th>Properties</th>
              </tr>
            </thead>
            <tbody>
            <tr>
              <td>{{ reportedScore.address }}</td>
              <td>{{ reportedScore.score }}</td>
              <td>{{ reportedScore.properties }}</td>
            </tr>
          </tbody>
        </table>
        </div>
          <div v-if="reportedScore.severity">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Confirmed</th>
                  <th>Reason</th>
                  <th>Severity</th>
                  <th>Metadata</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ reportedScore.confirmed }}</td>
                  <td>{{ reportedScore.reason }}</td>
                  <td>{{ reportedScore.severity }}</td>
                  <td>{{ reportedScore.metadata }}</td>
                </tr>
              </tbody>
            </table>
        </div>
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
    'scores',
    'reportedScore',
    'status'
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
*{
   color: #444444;
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
</style>
