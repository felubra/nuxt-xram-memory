<template>
  <section class="Page">
    <StaticPage :page-item="staticPage"/>
  </section>
</template>
<script>
import StaticPage from '~/components/common/StaticPage'
export default {
  components: {
    StaticPage
  },
  data() {
    return { staticPage: {} }
  },
  async asyncData({ $axios, route }) {
    const id = parseInt(route.params.id) || null
    return $axios.$get(`/api/v1/pages/${id}`).then(staticPage => {
      return { staticPage }
    })
  }
}
</script>
