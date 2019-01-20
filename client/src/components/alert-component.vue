<template>
  <div class="score container">
    <h1>Set up Trust Score Alert</h1>
    <!-- Container for the 'request score/alerting' functionality -->
    <div class="request container">
      <table class="table table-striped">
        <tr><td class="cellDescriptor">Chain</td><td><select v-model="id_chain">
          <option value="eth">eth</option>
          <option value="btc">btc</option>
          </select></td></tr>
        <tr><td class="cellDescriptor">Address</td><td><input v-model="id_address" placeholder="ex: 0x28hlm72..."></td></tr>
        <tr><td class="cellDescriptor">Name</td><td><input v-model="id_name" placeholder=""></td></tr>
        <tr><td class="cellDescriptor">URL</td><td><input v-model="id_url" placeholder=""></td></tr>
        <tr><td colspan="2"><button v-on:click="clickRequestAlertingEvent">Set Up Alert</button></td></tr>
      </table>
      <table class="table table-striped" v-if="status">
          <tr><td class="cellDescriptor dynamicResult">Alert successfully created</td></tr>
        </table>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'alert-component',
  data () {
    return {
      msg: 'Alerting',
      id_address: null,
      id_chain: 'eth',
      id_name: null,
      id_url: null,
      pending: false,
      requestAlertingEvent: null
    }
  },
  computed: mapState([
    'status'
  ]),
  methods: {
    clickRequestAlertingEvent (event) {
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

</style>
