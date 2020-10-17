<template>
  <div>
    <app-toast/>
    <appSidebar :visible="true"
      position="left"
      class="p-sidebar"
      :showCloseIcon="false"
      style="top:auto;overflow:auto;"
    >
      <div class="p-grid">
        <div class="card">
          <div class="p-field">
            <!-- <label for="zipcode"> Zipcode: </label> -->
            <appInputText id="zipcode" type="text" v-model="zipCode"
            class="p-inputtext" placeholder="Zipcode"
            />
          </div>
          <div class="p-my-3 p-jc-center">
            Number of properties {{ numberProps }}
            <appSlider v-model="numberProps" :min="1" :max="20" :value="10"
            class="p-my-2"
            @change="updateLimit"
            />
            <app-button label="Get properties" @click="getProperties_request" class="p-button-secondary p-my-2"/>
          </div>
        </div>
        <div class="card" v-show="getProperties.length>0">
          <appPropertyCard
          v-for="house in getProperties"
          v-bind:key="house.listing_id"
          v-bind:house="house"
          />
        </div>
      </div>
    </appSidebar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import Sidebar from 'primevue/sidebar'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Slider from 'primevue/slider'

import { backendApiAxios } from '../gateways/backend-api'

import PropertyCard from './PropertyCard'

export default {
  components: {
    appSidebar: Sidebar,
    appButton: Button,
    appInputText: InputText,
    appSlider: Slider,
    appPropertyCard: PropertyCard
  },
  computed: {
    ...mapGetters(['getProperties'])
  },
  data () {
    return {
      zipCode: '',
      numberProps: 10
    }
  },
  methods: {
    getProperties_request () {
      backendApiAxios.post('/mock-get-property-data',
        {
          zip: this.zipCode
        })
        .then(response => {
          console.log(response)
          this.updateProperties(response.data.properties)
        })
        .catch(error => {
          this.$toast.add({
            severity: 'error',
            summary: 'Error in getProperties Form retrieving data from API.See console for details',
            life: 3000
          })
          console.log(error)
        })
    },
    ...mapActions({
      updateLimit: 'setViewLimitProperties',
      updateProperties: 'updateProperties'
    })
  }
}
</script>

<style>
</style>
