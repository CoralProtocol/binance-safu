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
    walletBalance: null,
    instances: [],
    score: {
      id: null,
      address: null,
      blockchain: null,
      reason: null,
      severity: null,
      metadata: null
    },
    firstName: null,
    allowedToSubmitFraud: false,
    allowedToReviewFraud: false
  },
  getters : {},
  mutations: {
    SET_INSTANCES (state, res) {
      console.log('get fraud instances successful:')
      console.log(res)
      state.instances = res
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
    },
    SET_USER_DATA (state, res) {
      console.log(res)
      state.walletBalance = res.walletBalance
      state.firstName = res.firstName
      state.allowedToSubmitFraud = res.allowedToSubmitFraud
      state.allowedToReviewFraud = res.allowedToReviewFraud
    }
  },
  actions: {
    async getScore ({ commit }, payload) {
      console.dir(payload)
      const baseScoreRequest = 'http://localhost:3000/trust-scores/'
      const requestedChain = payload.blockchain + '/'
      const requestedAddress = payload.address
      const fullScoreRequest = baseScoreRequest + requestedChain + requestedAddress
      const response = await axios.get(fullScoreRequest)
      commit('SET_SCORE', response.data)
      return response.data
    },
    async loadInstances ({ commit }) {
      const response = await axios.get('http://localhost:3000/fraud-instances')
      commit('SET_INSTANCES', response.data)
      return response.data
    },
    async verifyFraudInstance ({ commit }, payload) {
      console.log(payload.urlSnippet);
      var response = await axios({
        method: 'post',
        url: 'http://localhost:3000/fraud-instances/'+payload.urlSnippet+'/review',
        data: {
          "confirm": true
        }
      });
      response = await axios.get('http://localhost:3000/fraud-instances')
      commit('SET_INSTANCES', response.data)
      return response.data
    },
    async loadUserData ({ commit }) {
      const response = await axios.get('http://localhost:3000/users/me')
      commit('SET_USER_DATA', response.data)
      return response.data
    },
  },
})
