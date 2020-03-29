<template lang="html">
  <div v-if="loaded">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2">
          <div class="sidebar border-right bg-white">
              <h4 class="pt-4 pl-4">Tags:</h4>
              <div class="custom-control custom-checkbox ml-4" v-for="(tag, index) in tags" :key="tag.tag">
                <input type="checkbox" class="custom-control-input" :id="'custom' + index" :value="tag.tag" v-model="selectedTags">
                <label class="custom-control-label" :for="'custom' + index">{{ tag.tag }}</label>
              </div>
          </div>
        </div>
        <div class="col-md-10">
          <div class="row">
            <div class="col-md-12">
              <h2 class="display-4 mt-3">Проекти</h2>
            </div>
          </div>
          <div class="row mt-3 mb-3">
            <div class="col-md-4 mb-2" v-for="project in projects" :key="project._id">
              <div class="card h-100">
                <div class="card-header">
                  Team: {{ project.slack }}
                </div>
                <div class="card-body">
                  <p> {{  shortDescription(project.solution, 200) }} </p>
                  <br>
                  <div class="">
                    Tags:
                    <b-badge pill variant="primary" v-for="tag in project.terms" :key="tag.term" class="ml-2">{{ tag.term }}</b-badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
  data () {
    return {
      tags: [{ tag: 'volunteer' }, { tag: 'developer' }],
      selectedTags: ['volunteer', 'developer']
    }
  },
  methods: {
    shortDescription(str, num) {
      return str.substring(0, num) + '...'
    }
  },
  async mounted() {
    await this.$store.dispatch('project/list')
  },
  computed: {
    ...mapGetters('user', ['loaded', 'logged_in']),
    ...mapGetters('project', ['projects'])
  }
}
</script>

<style lang="scss">
  .sidebar{
    left: -15px;
    position: fixed;
    right: 0;
    flex: 0 0 16.666667%;
    max-width: 16.666667%;
    height: calc(100vh - 56px);
  }
</style>
