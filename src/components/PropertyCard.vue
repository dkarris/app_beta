<template>
    <div>
      <appCard>
        <template slot="header">
          <img alt="pic" :src="house.thumbnail">
        </template>
        <template slot="title">
          {{ title }}
        </template>
        <template slot="subtitle">
          {{ subTitle }}
        </template>
        <template slot="content">
          {{ house.price | USD }}
             <hr>
          {{ address }}
          <hr>
          <appButton label="Estimate return" @click="passDataToCalc"/>
        </template>
      </appCard>
      </div>
</template>

<script>
import Card from 'primevue/card'
import Button from 'primevue/button'
import { eventBus } from '../main'

export default {
  components: {
    appCard: Card,
    appButton: Button
  },
  data: function () {
    return {
      mappingDict: {
        single_family: 'Single Family',
        condo: 'Condo',
        condos: 'Condo'
      }
    }
  },
  filters: {
    filterConvertAPIValues: function (value, mappingDict) {
      return this.convertAPIValues(value, mappingDict)
    }
  },
  methods: {
    convertAPIValues: (value, mappingDict) => {
      if (Object.prototype.hasOwnProperty.call(mappingDict, value)) {
        return mappingDict[value]
      } else {
        return value
      }
    },
    passDataToCalc: function () {
      // doing deep copy since house can't be mutated with new properties.
      const houseClone = JSON.parse(JSON.stringify(this.house))
      houseClone.address = this.address
      houseClone.propertyType = this.title
      houseClone.propertySubType = this.subTitle
      eventBus.$emit('propertyCardSelected', houseClone)
    }
  },
  props: ['house'],
  computed: {
    subTitle: function () {
      if (this.house.prop_sub_type) {
        return 'Subtype: ' +
         this.convertAPIValues(this.house.prop_sub_type, this.mappingDict)
      } else {
        return ''
      }
    },
    title: function () {
      if (this.house.prop_type) {
        return 'Property type: ' +
          this.convertAPIValues(this.house.prop_type, this.mappingDict)
      } else {
        return ''
      }
    },
    address: function () {
      if (this.house.address.line) {
        return this.house.address.line + ', ' +
          this.house.address.city + ', ' +
          this.house.address.postal_code
      } else {
        return ''
      }
    }
  }
}
</script>
<style>
</style>
