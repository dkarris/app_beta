<template>
  <div class="layout-footer">
    <Button @click="requestApi"
      label="checkAPI"
    />
    <h4> Curently logged user: </h4>
    <p> {{ getUser_FB_obj }} </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { backendApiAxios } from '../gateways/backend-api'
import Button from 'primevue/button'

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

<style scoped >
  .layout-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height:auto;
    min-height:10rem;
    margin-left: 300px;
    overflow-x:auto;
  }
</style>
