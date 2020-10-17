// import SignUp from '../components/SignUp'
// import Login from '../components/Login'
// import TheMainScreen from '../views/TheMainScreen.vue'
// import SideBar from '../components/SideBar'
// import PrimeVue from '../views/PrimeVue'

import AppTopBar from '../components/AppTopBar'
import AppFooter from '../components/AppFooter'
import AppSideBar from '../components/SideBar'
import AppMainScreen from '../views/PrimeVue'
import Login from '../components/Login'
import SignUp from '../components/SignUp'

export const routes = [
  {
    path: '/',
    name: 'main',
    components: {
      AppTopBar,
      AppFooter,
      AppSideBar,
      AppMainScreen
    }
  },
  {
    path: '/signup',
    name: 'singup',
    components: {
      AppTopBar,
      AppFooter,
      AppSideBar,
      AppMainScreen: SignUp
    }
  },
  {
    path: '/login',
    name: 'login',
    components: {
      AppTopBar,
      AppFooter,
      AppSideBar,
      AppMainScreen: Login
    }
  }
]

export default routes
