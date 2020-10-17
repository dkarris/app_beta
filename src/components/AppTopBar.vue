<template>
  <div class="topbar clearfix">
      <app-toast/>
      <router-link to="/" class="logo-link">
            <img class="logo" alt="apollo-layout" src="assets/layout/images/apollo_logo.png" />
        </router-link>
      <div v-if="!getUser_FB_obj" style="float:right;">
          <router-link to="/login">
            <app-button class="p-mx-2 p-button-secondary" label="Login"/>
          </router-link>
          <router-link to="/signup">
            <app-button label="Register" class="p-button-secondary"/>
          </router-link>
      </div>
      <div v-else style="float:right;">
        <button class="profile p-link">
          <span class="username"> {{ getUser_FB_obj.email }}</span>
          <img src="https://api.adorable.io/avatars/198/abott@adorable.png" alt="apollo-layout" />
          <app-button label="Logout" class="p-button-secondary" @click="logOut"/>
        </button>
      </div>
  </div>
</template>

<script>
import Button from 'primevue/button'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      userOptionsList: [{
        label: 'Logout',
        icon: 'pi pi-times',
        command: this.logOut
      }]
    }
  },
  components: {
    appButton: Button
    // SplitButton
  },
  methods: {
    logOut () {
      this.$store.dispatch('logOut').then(() => {
        this.$toast.add({
          severity: 'success',
          summary: 'User signed out sucessfully!',
          life: 3000
        })
      })
    }
  },
  computed: {
    ...mapGetters([
      'getUser_FB_obj'
    ])
  }
}
</script>
<style>
</style>
