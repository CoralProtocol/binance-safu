<template>
  <div class="submit container">
    <h1>{{ msg }}</h1>
    <div class="request container">
      Chain:
      <select v-model="id_chain">
        <option value="eth" selected="selected">eth</option>
        <option value="btc">btc</option>
      </select>&nbsp;
      Address: <input v-model="id_address" placeholder="ex: 0x28hlm72...">
      Reason: <select v-model="id_reason">
        <option value="blackmail" selected="selected">Blackmail</option>
        <option value="ofac">Government Watchlist</option>
        <option value="ransomeware">Ransomware</option>
        <option value="social_media_platform">Malicious Social Media Posting</option>
      </select>
      Severity: <input v-model="id_severity" placeholder="1">
      Metadata as JSON: <input v-model="id_metadata" placeholder='{"url":"http://123.ngrok.io"}'>
      <button v-on:click="submitEvidenceOfFraud">Submit Evidence of Fraud</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'submit-component',
  data () {
    return {
      msg: 'SUBMIT component',
      id_reason: 'blackmail',
      id_chain: 'eth',
      id_metadata: '',
      id_address: '',
      id_severity: ''
    }
  },
  methods: {
    submitEvidenceOfFraud (event) {
      const payload = {
        blockchain: this.id_chain,
        address: this.id_address,
        reason: this.id_reason,
        severity: this.id_severity,
        metadata: this.id_metadata
      }
      console.log(payload)
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
