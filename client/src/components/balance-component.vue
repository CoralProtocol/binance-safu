<template>
  <div class="balance">
    <h2 class="title">Welcome {{ firstName}}!</h2>
    <p>You have <strong>{{ walletBalance }}</strong> Trust Score Requests remaining. </p>
    <p>To get more you can either contribute instances of fraud, review instances of fraud, or purchase more.</p>
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
    'firstName'
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

title {
  align-: left
}

p {
  text-align: center;
}
</style>
