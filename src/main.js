import Vue from 'vue'
import App from './App.vue'

import routes from './router'
import VueRouter from 'vue-router'

import store from './store'

// Firebase modules
import * as firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from './firebase/credentials'

// Axios
import { backendApiAxios } from './gateways/backend-api'

// Primevue
import 'primeflex/primeflex.css'
import 'primevue/resources/primevue.css'
import 'primeicons/primeicons.css'

// Primevue styling
import 'primevue/resources/themes/saga-orange/theme.css'
import '../public/assets/layout/css/layout-orange-light.css'

// Primevue components that need to be installed globally

import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(ToastService)

// Firebase AUTH setup

;(function () {
  firebase.initializeApp(firebaseConfig)
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(function () {
    })
    .catch(function (error) {
      console.log(error)
    })
})()

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export const eventBus = new Vue()

Vue.filter('USD', function (amount) {
  if (typeof amount !== 'number') {
    return amount
  }
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  })
  return formatter.format(amount)
})
Vue.component('app-toast', Toast)

new Vue({
  router,
  store,
  render: h => h(App),
  data: function () {
    return { null: null }
  },
  created: function () {
    // at first create hook to see when user AUTH state is changed
    this.$store.dispatch('initFireBaseAuth')

    // next setup currentUser token status for backapi call
    const vm = this
    backendApiAxios.interceptors.request.use(
      function (config) {
        // check token validity if User signed
        // if user is not logged in, then add not signed in
        // to API request header
        if (!vm.$store.getters.getUser_FB_obj) {
          config.headers.authorization = ''
          return config
        }
        firebase.auth().currentUser.getIdToken(false)
          .then(function (idToken) {
            if (idToken) {
              config.headers.authorization = idToken
            } else {
              config.headers.authorization = ''
            }
          })
          .catch(function (error) {
            alert('There is an error:' + JSON.stringify(error))
            config.headers.authorization = 'token expired'
          })
        return config
      }
    )
  }
}).$mount('#app')
