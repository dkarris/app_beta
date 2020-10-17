<template>
  <div>
      <b-form-group
      id="zipGroup"
      description="Please enter your Zipcode to start searching"
      label="Zip"
      label-for="zipInput"
      :state="true"
      :invalid-feedback="invalidFeedback"
      :valid-feedback="validFeedback"
      >
        <b-form-input id="zipInput" v-model="zipValue" :state="state" trim></b-form-input>
      <b-button class="my-2" @click="getProperties">Get Properties</b-button>
      </b-form-group>
  </div>
</template>

<script>
// import { eventBus } from '../main'
import { backendApiAxios } from '../gateways/backend-api'
import { mapActions } from 'vuex'
export default {
  computed: {
    state: function () {
      return this.zipValue.length === 5
    },
    invalidFeedback: function () {
      if (this.zipValue.length > 5) {
        return ''
      } else {
        return 'Enter 5 digit zipcode'
      }
    },
    validFeedback: function () {
      return this.state === true ? 'Thank you' : ''
    }
  },
  data () {
    return {
      zipValue: ''
    }
  },
  methods: {
    ...mapActions([
      'updateProperties'
    ]),
    getProperties: function () {
      backendApiAxios.post('/mock-get-property-data',
        {
          zip: this.zipValue
        })
        .then((result) => {
          console.log(result)
          this.updateProperties(result.data.properties)
        })
        .catch((error) => {
          console.log('Error in getProperties Form retrieving data from API')
          console.log(error.response.data)
        })
    }
  }
}
</script>

<style>

</style>
