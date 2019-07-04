<template>
  <div id="main-wrapper">
    <header>
      <NewNavBar />
    </header>
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import NewNavBar from '~/components/common/NewNavBar'
import Footer from '~/components/common/Footer'

export default {
  name: 'Alt',
  components: {
    NewNavBar,
    Footer
  }
}
</script>
