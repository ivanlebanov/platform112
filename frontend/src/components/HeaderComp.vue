<template lang="html">
  <div v-if="loaded">
  <b-navbar toggleable="lg" variant="light" type="light" fixed="top">
    <b-navbar-brand :to="{ name: 'Home' }">Начало</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="!user" :to="{ name: 'Login' }">Login</b-nav-item>
        <b-nav-item  v-if="!user" :to="{ name: 'Register' }">Register</b-nav-item>
        <b-nav-item-dropdown v-if="user" right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>{{ user.firstName }}</em>
          </template>
          <b-dropdown-item :to="{ name: 'Profile' }">Profile</b-dropdown-item>
          <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HeaderComp',
  async mounted(){
      // await this.$store.dispatch('user/checkToken')
  },
  data() {
    return {
      cards: [],
      inegrated: 0,
      title: 'Home',
      economic: '',
    }
  },
  watch: { },
  components: { },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
    }
  },
  computed: {
    ...mapGetters('user', ['logged_in', 'loaded', 'user'])
  }
}
</script>

<style lang="scss" scoped>
</style>
