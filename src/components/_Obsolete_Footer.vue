<template>
  <div id="footer">
    <h3> This is my Footer template </h3>
    <h4> Curently logged user: </h4>
    <p> {{ getUser_FB_obj }} </p>
    <Button @click="requestApi"
      label="checkAPI"
    />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { backendApiAxios } from '../gateways/backend-api'
import Button from 'primevue/button'
// import { eventBus } from '../main'

export default {
  components: {
    Button
  },
  data: function () {
    return {
      zipCode: null
    }
  },
  computed: {
    ...mapGetters([
      'getUser_FB_obj'
    ])
    // currentUser: function () {
    //   return firebase.auth().currentUser
    // }
  },
  methods: {
    requestApi: function () {
      backendApiAxios.get('/greeting')
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
        .then(function () {
        })
    },
    getProperties: function () {
      backendApiAxios.post('/mock-get-property-data',
        {
          zip: this.zipCode
        })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  created: function () {

  }
}
</script>

<style scoped>

#footer {
  background-color: azure;
}

</style>
