<template>
  <section>
    <h1>logged in</h1>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  metaInfo() { return { title: this.title } },
  async mounted(){
      // await this.$store.dispatch('user/checkToken')
  },
  data() {
    return {
      title: 'Home',
    }
  },
  watch: { },
  components: { },
  computed: {
    ...mapGetters('user', ['logged_in', 'user'])
  }
}
</script>
