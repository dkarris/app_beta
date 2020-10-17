<template>
  <div class="layout-wrapper">
    <router-view name="AppTopBar"></router-view>
    <router-view name="AppSideBar"></router-view>
    <router-view name="AppMainScreen"></router-view>
    <!-- <router-view name="AppFooter"></router-view> -->
  </div>
</template>

<script>

export default {
  created: function () {
    this.$store.dispatch('initFireBaseAuth')
  },
  components: {
    // AppTopBar,
    // AppFooter,
    // AppSideBar,
    // AppMainScreen
  }
}
</script>
<style>
</style>
