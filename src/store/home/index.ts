import Api from '@/common/api'

interface State {
  swiperList: Object[],
  officialSheet: {},
  darenSheet: {},
  sortArea: {}
}

const state: State = {
  swiperList: [],
  officialSheet: {},
  darenSheet: {},
  sortArea: {}
}

const getters = {
  swiperList: (state: any) => state.swiperList,
  officialSheet: (state: any) => state.officialSheet,
  darenSheet: (state: any) => state.darenSheet,
  sortArea: (state: any) => state.sortArea
}

const mutations = {
  _setSwiperList: (state: any, swiperList: any) => {
    state.swiperList = swiperList
  },
  _setOfficialSheet: (state: any, officialSheet: any) => {
    state.officialSheet = officialSheet
  },
  _setDarenSheet: (state: any, darenSheet: any) => {
    state.darenSheet = darenSheet
  },
  _setSortArea: (state: any, sortArea: any) => {
    state.sortArea = sortArea
  },
}

const actions = {
  setHomeInfo: ({ commit }, payload: any) => {
    Api.home.getHome({}, (res: any) => {
      console.log(res)
      commit('_setSwiperList', payload)
    })
  },
  // setOfficialSheet: ({ commit }, payload: any) => {
  //   commit('_setOfficialSheet', payload)
  // },
  // setDarenSheet: ({ commit }, payload: any) => {
  //   commit('_setDarenSheet', payload)
  // },
  // setSortArea: ({ commit }, payload: any) => {
  //   commit('_setSortArea', payload)
  // },
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}