<template>
  <div class="layout-content" style="background-color:beige;">
    <div class="layout-content-container">
      <h1> This is Prime Vue page </h1>
        <appCalculator></appCalculator>
        <!-- <appCalculator v-show="getUser_FB_obj"></appCalculator> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import RoiCalculator from '../components/RoiCalculator'

export default {
  components: {
    appCalculator: RoiCalculator
  },
  computed: {
    ...mapGetters([
      'getUser_FB_obj'
    ])
  }
}
</script>

<style>
  .layout-content {
    margin-left: 300px;
    margin-top: 50px;
  }
</style>
