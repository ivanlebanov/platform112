<template lang="html">
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            Регистрирай се
          </div>
          <div class="card-body">
            <form @submit.prevent="register">
              <input type="text" v-model="form.firstName" placeholder="Име" class="form-control mb-3" required>
              <input type="text" v-model="form.lastName" placeholder="Фамилия" class="form-control mb-3" required>
              <input type="email" v-model="form.email" placeholder="Email" class="form-control mb-3" required>
              <input type="text" v-model="form.password" placeholder="Парола" class="form-control mb-3" required>
              <button type="submit" class="btn btn-dark">Създай</button>
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
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async register () {
      try {
        const data = await this.$store.dispatch('user/register', this.form)
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
