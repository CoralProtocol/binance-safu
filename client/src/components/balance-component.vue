<template>
  <div class="balance">
    <h2 class="title">Welcome {{ firstName}}!</h2>
    <p>You have {{ walletBalance }} Trust Score Requests remaining. To get more you can either contribute instances of fraud, review instances of fraud, or purchase more</p>

    <div>
      <span v-if="allowedToSubmitFraud">📤 You are allowed to submit evidence of fraud</span>
      <span v-if="allowedToReviewFraud">🔍 You are allowed to review evidence of fraud</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'balance-component',
  data () {
    return {
      msg: 'Balance: 303 REEF'
    }
  },
  computed: mapState([
    'walletBalance',
    'firstName',
    'allowedToSubmitFraud',
    'allowedToReviewFraud'
  ]),
  methods: {
    loadUserData (event) {
      // Reset variables
      this.fraudInstancesEvent = null
      this.$store.dispatch('loadUserData', {

      }, (err, result) => {
        if (err) {
          console.log(err)
        }
      })
    }
  },
  created () {
    this.loadUserData()
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

title {
  align-: left
}
</style>
