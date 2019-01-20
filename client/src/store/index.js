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
    reportedScore: {
      address: null,
      score: null,
      properties: null,
      confirmed: null,
      reason: null,
      severity: null,
      url: null
    },
    firstName: null,
    allowedToSubmitFraud: false,
    allowedToReviewFraud: false,
    status: null
  },
  getters : {},
  mutations: {
    SET_INSTANCES (state, res) {
      console.log('fraud instances successful:')
      console.log(res)
      state.instances = res
    },
    SET_SCORE (state, res) {
      console.log('Score mutation successful:')
      console.log(res)
      state.reportedScore.address = res.data.address
      state.reportedScore.score = res.data.score
      state.reportedScore.properties = res.data.properties
      state.reportedScore.confirmed = res.data.confirmed
      state.reportedScore.reason = res.data.reason
      state.reportedScore.severity = res.data.severity
      state.reportedScore.url = res.data.url
    },
    SET_USER_DATA (state, res) {
      console.log(res)
      state.walletBalance = res.walletBalance
      state.firstName = res.firstName
      state.allowedToSubmitFraud = res.allowedToSubmitFraud
      state.allowedToReviewFraud = res.allowedToReviewFraud

    },
    SET_ALERTING (state, res) {
      console.log('alerting mutation successful:')
      console.log(res)
      state.status = res
    },
    CLEAR_ITEMS (state) {
      state.scores = null
      state.score = null
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
    async setAlerting ({ commit }, payload) {
      var response = await axios({
        method: 'post',
        url: 'http://localhost:3000/trust-score-alerts/',
        data: payload
      });
      commit('SET_ALERTING', response.data)
      return response.data
    },
    async submitEvidenceOfFraud ({ commit }, payload) {
      var response = await axios({
        method: 'post',
        url: 'http://localhost:3000/fraud-instances/',
        data: payload
      });
      response = await axios.get('http://localhost:3000/fraud-instances')
      commit('SET_INSTANCES', response.data)
      return response.data
    },
    async loadInstances ({ commit }) {
      const response = await axios.get('http://localhost:3000/fraud-instances')
      commit('SET_INSTANCES', response.data)
      return response.data
    },
    clearItems ({ commit }) {
      commit('CLEAR_ITEMS')
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
