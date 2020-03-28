<template lang="html">
  <div v-if="loaded">
    <div class="container">
      <div class="row mt-3 mb-3">
        <div class="col-md-12">
          <!-- <b-jumbotron header="Актуалнo." lead="Всичко за кризата около теб." v-if="!logged_in">
            <p> Последно обновено: <strong>29.03.2020 22:22</strong></p>
            <b-button variant="primary" :to="{ name: 'Login' }">Влез в своя профил</b-button>
          </b-jumbotron> -->
          <!--  -->

        </div>
        <div class="col-md-4" v-for="project in projects"
        :key="project._id">
          <b-card
            :title="project.slack"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <b-card-text>
              {{ project.description }}
            </b-card-text>
          </b-card>
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
    await this.$store.dispatch('project/list')
  },
  computed: {
    ...mapGetters('user', ['loaded', 'logged_in']),
    ...mapGetters('project', ['projects'])
  }
}
</script>
