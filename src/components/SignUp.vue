<template>
    <div class="layout-content" style="justify-content:center; align-items:center;">
      <h2> Sign Up form </h2>
      <div class="p-grid p-mx-2 p-my-5">
        <div class="card p-fluid">
          <div class="p-field">
            <label for="Email address:"> Email: </label>
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
      const user = {
        name: this.form.name,
        email: this.form.email,
        password: this.form.password
      }
      this.$store.dispatch(
        'signupUser', user).then(() => {
        this.$router.push({ path: '/' })
      })
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
