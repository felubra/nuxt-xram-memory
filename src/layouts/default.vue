<template>
  <div id="main-wrapper">
    <header>
      <Menu />
      <fixed-header :fixed.sync="navBarFixed" :threshold="100">
        <Navbar :class="{ 'NavBar--fixed': navBarFixed }" />
      </fixed-header>
    </header>
    <nuxt />
  </div>
</template>

<script>
import Navbar from '~/components/common/Navbar'
import Menu from '~/components/common/Menu'
import FixedHeader from 'vue-fixed-header'

export default {
  name: 'DefaultLayout',
  components: {
    Navbar,
    Menu,
    FixedHeader
  },
  data() {
    return {
      navBarFixed: false
    }
  },
  computed: {}
}
</script>


<style>
</style>
