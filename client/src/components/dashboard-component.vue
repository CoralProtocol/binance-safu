<template>
  <div class="dashboard">
    <h1>{{ title }}</h1>
    <!-- <h2>{{ tagline }}</h2> -->
    <balance-component/>
    <scores-component/>
    <submit-component/>
    <review-component/>
  </div>

</template>

<script>

// Import components
import BalanceComponent from '@/components/balance-component'
import ScoresComponent from '@/components/scores-component'
import SubmitComponent from '@/components/submit-component'
import ReviewComponent from '@/components/review-component'

export default {
  name: 'dashboard-component',
  data () {
    return {
      title: 'Fraud Dashboard',
      tagline: 'Coral Protocol'
    }
  },
  beforeMount () {
    this.$store.dispatch('clearItems')
  },
  components: {
    'balance-component': BalanceComponent,
    'scores-component': ScoresComponent,
    'submit-component': SubmitComponent,
    'review-component': ReviewComponent
  }
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
