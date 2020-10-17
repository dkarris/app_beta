<template :key="componentKey">
  <div>
    <h3> Calculator </h3>
    <div class="p-grid">
      <div class="p-col-12 p-md-3">
        <div class="card p-fluid">
            <h3> Property details </h3>
            <div v-if="house">
              <span class="p-float-label">
              <appInputText
              type="text"
              v-model="house.address"
              id="address"
              class="p-my-2 p-inputtext-lg"
              />
              <label for="address">Property address</label>
              </span>
              <label for="price">List Price</label>
              <appInputNumber v-model="house.price"
              id="price"
              mode="currency"
              locale="en-US"
              currency="USD"
              showButtons buttonLayout="horizontal" decrementButtonClass="p-button-secondary"  incrementButtonClass="p-button-secondary"
              incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
              class="p-inputnumber-lg"
              />
              <appSlider v-model="house.price"
                :max="this.maxPrice"
                class="p-my-2"/>
              <label for="estimate">Current estimate</label>
              <appInputNumber id="estimate" v-model="currentEstimate"
              mode="currency"
              locale="en-US"
              currency="USD"
              showButtons buttonLayout="horizontal" decrementButtonClass="p-button"  incrementButtonClass="p-button"
              incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
              />
               <h3>Last sold: </h3>
              <appCalendar :inline="false"
              :showButtonBar="true"
              :showIcon="true"
              v-model="lastSoldDate"
              selectionMode="single"
              :selectOtherMonths="true"
              :yearRange="'(1980:2021)'"
              />
               <p>{{ prevDateYear() | roundNumber(1) }} Year(s) ago</p>
              <label for="previousPrice">Previous Price</label>
              <appInputNumber id="previousPrice" v-model="previousMockPrice"
              mode="currency"
              locale="en-US"
              currency="USD"
              showButtons buttonLayout="horizontal" decrementButtonClass="p-button"  incrementButtonClass="p-button"
              incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
              />

              <h5>CAGR: {{ calcCAGR() | roundNumber(1)}}% </h5>

              <label class="p-my-2" for="size">Size:</label>
              <appInputNumber id="size" v-model="house.building_size.size"
              :suffix="' ' + house.building_size.units"
              showButtons buttonLayout="horizontal" decrementButtonClass="p-button-secondary"  incrementButtonClass="p-button-secondary"
              incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
              />

              <h5> List Price / {{house.building_size.units }}: {{ house.price / house.building_size.size | roundNumber(0) }} </h5>
              <div class="card p-fluid">
                <h3> Mortgage term (years) {{ mortgage.mortgageTerm }}</h3>
                <appSlider v-model="mortgage.mortgageTerm"
                  :max="30"
                  :min="1"
                  :placeholder="15"
                  :step="1"
                  class="p-my-2"/>
                <h3> Mortgage downpayment % {{ mortgage.mortgageDownPct }}</h3>
                <appSlider v-model="mortgage.mortgageDownPct"
                  :max="100"
                  :min="0"
                  :placeholder="20"
                  class="p-my-2"
                  @change="mortgageDownDollarCalc"/>
                <p> Downpayment: {{ this.mortgage.mortgageDownDollar | roundNumber(0) }} </p>
                <p> Finance: {{ this.mortgage.mortgageAmount | roundNumber(0) }} </p>
                <h3> Interest rate: {{ mortgage.mortgageInterest }}% </h3>
                <appSlider v-model="mortgage.mortgageInterest"
                  :max="100"
                  :step="0.2"
                  :min="1"
                  :placeholder="20"
                  class="p-my-2"/>
                <p> Monthly payment: {{ mortgagePaymentCalc | roundNumber(2) }} </p>

              </div>
              <div class="card p-fluid">
                <h3>Home appreciation assumptions </h3>
                <p> Years owned </p>
                <appInputNumber v-model="futureTimeYears"
                showButtons buttonLayout="horizontal" decrementButtonClass="p-button"  incrementButtonClass="p-button"
                incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                class="p-inputnumber-lg p-mb-2"
                />
                <p class="p-mb-0"> Months: {{ futureTimeYears*12 }}
                <p class="p-mb-0"> Appreciation rate: {{ appreciationRate }} </p>
                <appSlider v-model="appreciationRate"
                  :max="this.calcCAGR()*2"
                  :placeholder="calcCAGR()"
                  :step="0.2"
                  class="p-my-2"/>
                <appInputNumber id="newEstimatedPrice" v-model="newEstimatedPriceComputed"
                mode="currency"
                locale="en-US"
                currency="USD"
                showButtons buttonLayout="horizontal" decrementButtonClass="p-button-secondary"  incrementButtonClass="p-button-secondary"
                incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                />
                <h4> Projected home equity: </h4>
                {{ this.newEstimatedPrice - (this.mortgage.mortgageAmount-this.mortgageCumulResult().accumPrincipal) | roundNumber(0)}}
              </div>
            </div>
        </div>
      </div>
      <div class="p-col-12 p-md-3" v-if="house">
        <div class="card p-fluid">
          <h3>Closing costs</h3>
            <label for="closing_costs">Closing costs:</label>
              <appInputNumber v-model="mortgage.closingCosts"
              id="closing_costs"
              mode="currency"
              locale="en-US"
              currency="USD"
              showButtons buttonLayout="horizontal" decrementButtonClass="p-button-secondary"  incrementButtonClass="p-button-secondary"
              incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
              class="p-inputnumber-lg"
              />
             <appSlider v-model="mortgage.closingCosts"
                class="p-my-2"
                :max="this.maxClosingCostSlider"/>
              <h6> OR, {{ this.closingCostsPercentComputed  | roundNumber(1)}} % of sales</h6>
              <appSlider v-model="closingCostsPercentComputed"
                  :max="1"
                  class="p-my-2"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Slider from 'primevue/slider'
import Calendar from 'primevue/calendar'

import { eventBus } from '../main'
import formulajs from 'formulajs'

export default {
  components: {
    appInputText: InputText,
    appInputNumber: InputNumber,
    appSlider: Slider,
    appCalendar: Calendar
  },
  data () {
    const calcDefaultPrevDate = new Date()
    calcDefaultPrevDate.setFullYear(calcDefaultPrevDate.getFullYear() - 3)
    return {
      componentKey: 0,
      house: null,
      maxPrice: null,
      futureTimeYears: 3,
      lastSoldDate: calcDefaultPrevDate,
      currentDate: new Date(),
      previousMockPrice: 200000,
      appreciationRate: 0,
      newEstimatedPrice: 0,
      mortgage: {
        mortgageTerm: 30,
        mortgageDownPct: 20,
        mortgageDownDollar: 0,
        mortgageInterest: 5,
        mortgageAmount: 0,
        closingCosts: 0
      }
    }
  },
  computed: {
    newEstimatedPriceComputed: {
      // temp function should be in data model to adjust for slider/appreciation
      get () {
        return this.house.price * ((1 + this.appreciationRateComputed / 100) ** (this.futureTimeYears))
      },
      set (newValue) {
        this.newEstimatedPrice = newValue
      }
    },
    appreciationRateComputed: function () {
      return this.appreciationRate
    },
    currentEstimate: function () {
      return this.house.price * 1.2
    },
    mortgagePaymentCalc: {
      get: function () {
        return formulajs.PMT(this.mortgage.mortgageInterest / 12 / 100,
          this.mortgage.mortgageTerm * 12, -this.mortgage.mortgageAmount, 1)
      }
    },
    maxClosingCostSlider () {
      return this.house.price * 30 / 100
    },
    closingCostsPercentComputed: {
      get () {
        return this.mortgage.closingCosts / this.house.price
      },
      set (value) {
        this.mortgage.closingCosts = this.house.price * value
      }
    }
    // previousMockPrice: function () {
    //   return this.house.price * 0.85
    // }
  },
  methods: {
    durYear: function (first, last) {
      return (Math.abs(last.getTime() - first.getTime()) / (1000 * 3600 * 24 * 365))
    },
    prevDateYear: function () {
      return this.durYear(this.currentDate, this.lastSoldDate)
    },
    calcCAGR: function () {
      return ((this.currentEstimate / this.previousMockPrice) ** (1 / this.prevDateYear()) - 1) * 100
    },
    mortgageCumulResult: function () {
      const accumInterest = -formulajs.CUMIPMT(this.mortgage.mortgageInterest / 12 / 100,
        this.mortgage.mortgageTerm * 12, this.mortgage.mortgageAmount, 1, this.futureTimeYears * 12, 1)
      const accumPrincipal = -formulajs.CUMPRINC(this.mortgage.mortgageInterest / 12 / 100,
        this.mortgage.mortgageTerm * 12, this.mortgage.mortgageAmount, 1, this.futureTimeYears * 12, 1)
      return {
        accumInterest,
        accumPrincipal
      }
    },
    mortgageDownDollarCalc: function () {
      this.mortgage.mortgageDownDollar = this.mortgage.mortgageDownPct / 100 * this.house.price
      this.mortgage.mortgageAmount = this.house.price - this.mortgage.mortgageDownDollar
      return this.mortgageDownDollar
    }
  },
  created () {
    eventBus.$on('propertyCardSelected', (house) => {
      this.house = house
      this.maxPrice = this.house.price * 2 // Non reactive variable to make slider work
      this.componentKey += 1
    })
  },
  filters: {
    roundNumber: function (value, decimals) {
      if (value) {
        return value.toFixed(decimals)
      } else {
        return ''
      }
    }
  }
}
</script>

<style>
</style>
