<template>
  <div class="layout-content" style="justify-content:center; align-items:center;">
      <h2> Login form </h2>
      <div class="p-grid p-mx-2 p-my-5">
        <div class="card p-fluid">
          <div class="p-field">
            <label for="email"> Email: </label>
            <InputText id="email" type="email" v-model="form.email"
            class="p-inputtext-lg" placeholder="Enter email"
            />
          </div>
          <div class="p-field">
            <label for="password"> Password: </label>
            <InputText id="password" type="password"
              v-model="form.password" placeholder="Enter password"
              class="p-inputtext-lg"
              />
          <app-button label="Submit" @click="onSubmit"/>
          <app-button label="Reset" class="p-my-2" @click="onSubmit"/>
          </div>
        <div class="card p-fluid">
            {{ form }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
export default {
  data () {
    return {
      form: {
        email: '',
        name: '',
        password: ''
      },
      show: true
    }
  },
  components: {
    InputText,
    appButton: Button
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.$store.dispatch('login', {
        email: this.form.email,
        password: this.form.password
      }).then(() => {
        this.$router.push({ path: '/' })
      })
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.checked = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
<style>
  /* #login_div {
    margin-left: 300px;
    margin-top: 50px;
  } */
</style>
