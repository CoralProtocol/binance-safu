<template>
  <div class="balance">
    <h2 class="title">Welcome {{ firstName}}!</h2>
    <p>You have {{ walletBalance }} Trust Score Requests remaining. To get more you can either contribute instances of fraud, review instances of fraud, or purchase more</p>

    <div>
      <p v-if="allowedToSubmitFraud">📤 You are authorized to submit evidence of fraud</p>
      <p v-if="allowedToReviewFraud">🔍 You are authorized to review evidence of fraud</p>
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

p {
  text-align: center;
}
</style>
