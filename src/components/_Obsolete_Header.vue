<template>
    <div>
        <b-navbar toggleable="lg" type="light" variant="warning">
            <router-link to="/" v-slot="{ href, navigate}">
                <b-navbar-brand :href="href" @click="navigate">MLS $$</b-navbar-brand>
            </router-link>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item href="#">ROI Calculator</b-nav-item>
                <b-nav-item href="#">Look around</b-nav-item>
                <!-- <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <!-- <b-nav-form>
                    <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                    <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                </b-nav-form> -->
                <div v-if="!getUser_FB_obj">
                  <router-link to="/signup" v-slot="{ href, navigate}">
                      <b-button :href="href" @click="navigate" class="my-1 my-sm-8" size="bg">SignUp
                      </b-button>
                  </router-link>
                  <router-link to="/login" v-slot="{ href, navigate}">
                      <b-button :href="href" @click="navigate" class="my-1 my-sm-8 ml-2" size="bg">Login
                      </b-button>
                  </router-link>
                </div>
                <div v-else>
                  <b-button class="my-1 my-sm8 ml-2" size="bg" @click="logOut">Logout</b-button>
                </div>
                <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template v-slot:button-content>
                    <em>User</em>
                </template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  methods: {
    logOut: function () {
      this.$store.dispatch('logOut')
    }
  },
  computed: {
    ...mapGetters([
      'getUser_FB_obj'
    ])
  }
}
</script>

<style scoped>

</style>
