<template>
  <div id="main-wrapper">
    <header>
      <fixed-header :fixed.sync="navBarFixed" :threshold="100">
        <NewNavBar />
      </fixed-header>
    </header>
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import NewNavBar from '~/components/common/NewNavBar'
import Footer from '~/components/common/Footer'
import FixedHeader from 'vue-fixed-header'
export default {
  name: 'Alt',
  components: {
    NewNavBar,
    Footer,
    FixedHeader
  },
  data() {
    return {
      navBarFixed: false
    }
  }
}
</script>
