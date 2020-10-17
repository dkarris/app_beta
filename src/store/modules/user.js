import firebase from 'firebase/app'

const state = {
  userProfile: {
    data: {
      status: '',
      plan: ''
    },
    user_FB_obj: null
  }
}

const getters = {
  getUser_FB_obj: function (state) {
    return state.userProfile.user_FB_obj
  }
}

const mutations = {
  FB_CALL_BACK_OBSERVABLE: function (state, user) {
    state.userProfile.user_FB_obj = JSON.parse(JSON.stringify(user))
    // state.userProfile.currentUser = JSON.parse(JSON.stringify(firebase.auth().currentUser))
  }
}
const actions = {
  initFireBaseAuth: function ({ commit }) {
    firebase.auth()
      .onAuthStateChanged(function (user) {
        commit('FB_CALL_BACK_OBSERVABLE', user)
      }
      )
  },
  signupUser: function (context, authData) {
    firebase // Main
      .auth()
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(function () {
        console.log('Sign up success')
      })
      .catch(function (error) {
        alert(JSON.stringify(
          {
            code: error.code,
            message: error.message
          }))
      })
  },
  login: function (context, authData) {
    firebase.auth().signInWithEmailAndPassword(authData.email, authData.password)
      .then(function () {
        console.log('Login success')
      })
      .catch(function (error) {
        alert(JSON.stringify(
          {
            code: error.code,
            message: error.message
          }))
      })
  },
  logOut: function ({ commit }) {
    firebase.auth().signOut()
      .then(function () {
        // commit('FB_SIGN_OUT_USER')
        console.log('Signed out from action!')
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
