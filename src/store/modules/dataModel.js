const state = {
  properties: [],
  propertiesLimit: 10
}

const getters = {
  getProperties: function (state) {
    return state.properties.slice(0, state.propertiesLimit)
  }
}

const mutations = {
  LOAD_PROPERTIES: function (state, properties) {
    state.properties = properties
  },
  SET_VIEW_LIMIT_PROPERTIES: function (state, limit) {
    state.propertiesLimit = limit
  }
}

const actions = {
  updateProperties: function (context, propList) {
    context.commit('LOAD_PROPERTIES', propList)
  },
  setViewLimitProperties: function ({ commit }, limit) {
    commit('SET_VIEW_LIMIT_PROPERTIES', limit)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
