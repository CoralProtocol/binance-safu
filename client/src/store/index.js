/* eslint-disable */

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

// Set headers for http requests
const api_key = '43c51a9c-4e50-471a-be52-22c836eaa867';
axios.defaults.headers.common['Authorization'] = api_key;

Vue.use(Vuex);
Vue.use(VueAxios, axios)

export const store = new Vuex.Store({
  state: {
    balance: null,
    instances: [],
    score: {
      id: null,
      address: null,
      blockchain: null,
      reason: null,
      severity: null,
      metadata: null
    },
  },
  getters : {},
  mutations: {
    SET_INSTANCES (state, res) {
      console.log('get fraud instances successful:')
      console.log(res)
      state.instances = res.r
    },
    SET_SCORE (state, res) {
      console.log('Score mutation successful:')
      console.log(res)
      state.score.id = res._id
      state.score.address = res.address
      state.score.blockchain = res.blockchain
      state.score.reason = res.reason
      state.score.severity = res.severity
      state.score.metadata = res.metadata
    }
  },
  actions: {
    getScore ({ commit }, payload) {
      axios
        .get('http://localhost:3000/trust-scores/eth/0x3d9dfa1fbcb5b258d224fe6d147c2df9890a3c99')
        .then(r => r.data)
        .then(address => {
          console.log(address)
        })
        .commit('SET_SCORE', payload)
    },
    loadInstances ({ commit }) {
      axios
        .get('http://localhost:3000/fraud-instances')
        .then(r => r.data)
        // .then(_id => {
        //   console.log(_id)
        // })
        .commit('SET_INSTANCES')
    }
  },
})
