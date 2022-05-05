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
    initData: {
      groupId: 55301,
      user: {}
    },
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
    clearError({ commit }) {
      commit('clearError')
    },
    loadInitResource({ commit, state }) {
      if (state.initData == null) {
        return new Promise(function (resolve, reject) {
          // let param = {}
          // let orginURL = window.location.href
          // let coma = window.location.href.lastIndexOf('#/')
          // if (coma > 0) {
          //   orginURL = window.location.href.substr(0, coma)
          // }
          // var url1 = new Promise(function (resolve, reject) {
          //   axios.get(orginURL + support.renderURLInit, param).then(function (response) {
          //     let serializable = response.data
          //     resolve(serializable)
          //   }).catch(function (error) {
          //     console.log(error)
          //     reject(error)
          //   })
          // })
          // Promise.all([url1]).then(function (results) {
          //   var data = results[0]
          //   console.log('InitData============>>>>', data)
          //   commit('setInitData', data)
          //   resolve(data)
          // }).catch(function (xhr) {
          //   commit('setInitData', null)
          //   reject(null)
          // })
          resolve({
            groupId: 55301,
            user: {}
          })
        })
      } else {
        return new Promise((resolve, reject) => {
          resolve(state.initData)
        })
      }
    },
    getDataTable({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        axios.post('/o/dklr/_search', data).then(function (response) {
          const serializable = response.data
          resolve(serializable)
        }).catch(function (error) {
          reject(error)
        })
      })
    },
    exportPdfReport({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        let config = {
          responseType: 'blob'
        }
        // axios({
        //   method: 'post',
        //   params: data,
        //   url: '/o/rest/vr-app/report/' + data['rptDescription'],
        //   responseType: 'blob'
        // }).then(function (response) {
        //   var url = window.URL.createObjectURL(response.data)
        //   resolve({
        //     url: url
        //   })
        // });
        axios.post('/o/rest/vr-app/report/' + data['rptDescription'], data, config).then(function (response) {
          var url = window.URL.createObjectURL(response.data)
          resolve({
            url: url
          })
        }).catch(function (error) {
          console.log(error)
          reject(error)
        })
      })
    },
    loadLoaiPT({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          var url = '/o/rest/vr-app/collections/' + data['code'] + '/XCG/items'
          var configs = {
            headers: {
              groupId: state.initData['groupId']
            }
          }
          axios.get(url, configs).then(function (response) {
            var serializable = response.data
            resolve(serializable)
          }).catch(function (error) {
            console.log(error)
            reject(error)
          })
        }).catch(xhr => {
          console.log(xhr)
        })
      })
    },
    loadNhomBC({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          var url = '/o/rest/vr-app/reportcategory/rptlevel/1'
          var configs = {
            headers: {
              groupId: state.initData['groupId']
            }
          }
          axios.get(url, configs).then(function (response) {
            var serializable = response.data
            resolve(serializable)
          }).catch(function (error) {
            console.log(error)
            reject(error)
          })
        }).catch(xhr => {
          console.log(xhr)
        })
      })
    },
    loadMauBC({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          var url = '/o/rest/vr-app/reportcategory/rptgroup/' + data['rptGroup']
          var configs = {
            headers: {
              groupId: state.initData['groupId']
            }
          }
          axios.get(url, configs).then(function (response) {
            var serializable = response.data
            resolve(serializable)
          }).catch(function (error) {
            console.log(error)
            reject(error)
          })
        }).catch(xhr => {
          console.log(xhr)
        })
      })
    }
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload
    },
    setLoadingTable(state, payload) {
      state.loadingTable = payload
    },
    setLoadingSubmit(state, payload) {
      state.loadingSubmit = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    setThongTinChung(state, payload) {
      window.sessionStorage.setItem('thongTinChung', JSON.stringify(payload))
      state.thongTinChung = payload
    }
  },
  getters: {
    initData(state) {
      return state.initData
    },
    loading(state) {
      return state.loading
    },
    cssxModel(state) {
      return state.cssxModel
    },
    thongTinChung(state) {
      let thongTinChung = state.thongTinChung
      if (!thongTinChung || Object.keys(thongTinChung).length === 0 && thongTinChung.constructor === Object) {
        let item = window.sessionStorage.getItem('thongTinChung') || '{}'
        return JSON.parse(item) || {}
      } else {
        return thongTinChung
      }
    },
    loadingInitData(state) {
      return new Promise((resolve, reject) => {
        store.dispatch('loadInitResource').then(function (result) {
          resolve(result)
        })
      })
    }
  }
})
