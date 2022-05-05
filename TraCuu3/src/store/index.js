import Vue from 'vue'
import Vuex from 'vuex'
import toastr from 'toastr'
import axios from 'axios'
// import support from './support.json'
// import $ from 'jquery'
// import router from '@/router'

Vue.use(toastr)
Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    initData: null,
    loading: false,
    loadingTable: false,
    loadingSubmit: false,
    error: null,
    docTypes: null,
    roleFilterStatus: null,
    userSignsData: null,
    otherData: {},
    itineraryNo: null,
    detailHs: null,
    maritimeCode: '',
    thongTinChung: {},
    thongTinXuong: {},
    thongTinDoanhNghiep: {},
    cssxModel: {}
  },
  actions: {
    clearError ({commit}) {
      commit('clearError')
    },
    loadInitResource ({commit, state}) {
      if (state.initData == null) {
        return new Promise(function (resolve, reject) {
          resolve({})
        })
      } else {
        return new Promise((resolve, reject) => {
          resolve(state.initData)
        })
      }
    },
    getDataTable ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        axios.post('/o/rest/vr-app/_search', data).then(function (response) {
          const serializable = response.data
          resolve(serializable)
        }).catch(function (error) {
          reject(error)
        })
      })
    }
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setLoadingTable (state, payload) {
      state.loadingTable = payload
    },
    setLoadingSubmit (state, payload) {
      state.loadingSubmit = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setInitData (state, payload) {
      state.initData = payload
    },
    clearError (state) {
      state.error = null
    },
    setDocTypes (state, payload) {
      state.docTypes = payload
    },
    setRoleFilterStatus (state, payload) {
      state.roleFilterStatus = payload
    },
    setCssxModel (state, payload) {
      state.cssxModel = payload
    }
  },
  getters: {
    initData (state) {
      return state.initData
    },
    loading (state) {
      return state.loading
    },
    cssxModel (state) {
      return state.cssxModel
    },
    loadingInitData (state) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          resolve(result)
        })
      })
    }
  }
})
