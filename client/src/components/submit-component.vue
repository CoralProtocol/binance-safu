<template>
  <div class="submit container" v-if="allowedToSubmitFraud">
    <h1>{{ msg }}</h1>
    <div class="request container">
    <table class="table table-striped">
      <tr><td class="cellDescriptor">Chain</td><td>  <select v-model="id_chain">
          <option value="eth" selected="selected">eth</option>
          <option value="btc">btc</option>
        </select></td></tr>
      <tr><td class="cellDescriptor">Address</td><td><input v-model="id_address" placeholder="ex: 0x28hlm72..."></td></tr>
      <tr><td class="cellDescriptor">Reason</td><td>  <select v-model="id_reason">
        <option value="blackmail" selected="selected">Blackmail</option>
        <option value="phishing" selected="selected">Phishing</option>
        <option value="ofac">Government Watchlist</option>
        <option value="ransomware">Ransomware</option>
        <option value="social_media_platform">Malicious Social Media Posting</option>
        </select></td></tr>
      <tr><td class="cellDescriptor">Severity</td><td><input v-model="id_severity" placeholder="1"></td></tr>
      <tr><td class="cellDescriptor">URL</td><td><input v-model="id_url" placeholder='http://...'></td></tr>
      <tr><td colspan="2"><button v-on:click="submitEvidenceOfFraud">Submit Evidence of Fraud</button></td></tr>
      </table>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'submit-component',
  data () {
    return {
      msg: 'Submit Evidence of Fraud',
      id_reason: 'blackmail',
      id_chain: 'eth',
      id_url: '',
      id_address: '',
      id_severity: ''
    }
  },
  computed: mapState([
    'allowedToSubmitFraud'
  ]),
  methods: {
    submitEvidenceOfFraud (event) {
      const payload = {
        blockchain: this.id_chain,
        address: this.id_address,
        reason: this.id_reason,
        severity: this.id_severity,
        url: this.id_url
      }
      console.log(payload)
      this.$store.dispatch('submitEvidenceOfFraud', payload, {

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
