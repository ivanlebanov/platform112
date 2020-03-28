<template>
  <div id="app" class="bootstrap-wrapper">
    <HeaderComp />
    <main>
      <router-view />
    </main>
    <notifications group="foo" position="top right" :duration="num"></notifications>
  </div>
</template>

<script>
// import FooterComponent from "@/components/FooterComponent"
import HeaderComp from "@/components/HeaderComp"

import { mapGetters } from "vuex"
import moment from 'moment'

export default {
  metaInfo: {
    title: "",
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} - Crisis` : 'Crisis'
  }
  },
  components: { HeaderComp },
  watch: {
    'user': function(newVal, oldVal) {
      if(newVal){
        this.$socket.emit('SET_SOCKET_USER', newVal._id)
      }
    }
  },
  async mounted(){
    await this.$store.dispatch('user/checkToken')
  },
  data() {
    return {
      num: 5000,
      show: false
    }
  },
  methods: {
    closeIntegrationWindow() {
      this.$store.dispatch('integration/closeWindow')
    }
  },
  computed: {
    ...mapGetters("user", ["user", "id"]),
  }
}
</script>
<style lang="scss">
@import './assets/style.css';
body main{
  padding-top: 56px;
}
</style>
