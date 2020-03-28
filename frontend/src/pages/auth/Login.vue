<template lang="html">
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            Влез в профила си
          </div>
          <div class="card-body">
            <form @submit.prevent="login">
              <input type="email" v-model="form.email" placeholder="Email" class="form-control mb-3" required>
              <input type="password" v-model="form.password" placeholder="Парола" class="form-control mb-3" required>
              <button type="submit" class="btn btn-dark">Влез</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formError: null,
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      try {
        const data = await this.$store.dispatch('user/login', this.form)
        this.formError = null
        // if (data.user.isAdmin) {
        //   this.$router.push({ name: 'admin' })
        // }
      } catch (e) {
        this.formError = e.message
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
