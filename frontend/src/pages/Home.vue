<template lang="html">
  <div v-if="loaded">
    <div class="container">
      <div class="row mt-3 mb-3">
        <div class="col-md-12">
          <b-jumbotron header="Актуалнo." lead="Всичко за кризата около теб." v-if="!logged_in">
            <p> Последно обновено: <strong>29.03.2020 22:22</strong></p>
            <b-button variant="primary" :to="{ name: 'Login' }">Влез в своя профил</b-button>
          </b-jumbotron>
          <!--  -->
          list of news articles
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: { },
  metaInfo() { return {  } },
  async mounted() {

  },
  computed: {
    ...mapGetters('user', ['logged_in', 'user', 'loaded'])
  }
}
</script>
