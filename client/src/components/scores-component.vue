<template>
  <div class="score container">
    <!-- <h2>{{ msg }}</h2> -->
    <!-- Container for the 'request score/alerting' functionality -->
    <div class="request container">
      Address: <input v-model="id_address" placeholder="ex: 0x28hlm72...">
        <p> </p>
        <button v-on:click="requestScoreEvent">Request Score</button>
        <button v-on:click="requestAlertingEvent">Request Alerting</button>
      <img v-if="pending" id="loader" src="https://loading.io/spinners/double-ring/lg.double-ring-spinner.gif">
      <div class="event" v-if="requestScoreEvent">
        <p v-if="requestScoreEvent.trustScore" id="request-score-event-succeed"><i aria-hidden="true" class="fa fa-check"></i> Trust Score: {{requestScoreEvent._trustScore}}.</p>
        <p v-else id="request-score-event-failed"><i aria-hidden="true" class="fa fa-times"></i> Error: Score not returned.</p>
      </div>
      <!-- <div class="event" v-if="requestAlertingEvent">
        <p v-if="requestScoreEvent.trustScore" id="request-score-event-succeed"><i aria-hidden="true" class="fa fa-check"></i> Trust Score: {{requestScoreEvent._trustScore}}.</p>
        <p v-else id="request-score-event-failed"><i aria-hidden="true" class="fa fa-times"></i> Error: Score not returned.</p>
      </div> -->
    </div>
  </div>
</template>
<script>

export default {
  name: 'scores-component',
  data () {
    return {
      msg: 'Request address score/alerts',
      id_address: null,
      pending: false,
      requestScoreEvent: null,
      requestAlertingEvent: null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
#node-add-succeeded {
  color: green;
}
#node-add-failed {
  color:red;
}
#is-node-succeeded {
  color: green;
}
#is-node-failed {
  color:red;
}
#view-count-incremented {
  color: green;
}
#view-count-not-incremented {
  color:red;
}
#get-view-count-succeed {
  color: green;
}
#get-view-count-failed {
  color:red;
}
#structure-succeed {
  color: green;
}
#structure-failed {
  color:red;
}
</style>
