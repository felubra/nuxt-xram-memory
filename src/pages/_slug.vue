<template>
  <Section class="Page CenteredPage">
    <header>
      <Microtext>{{staticPage.teaser_text}}</Microtext>
      <h1>{{staticPage.title}}</h1>
    </header>
    <main v-html="theBody"></main>
  </Section>
</template>
<script>
import { sanitize } from '@/utils/'
// Importe os estilos padrão do quill para formatar corretamente o nosso html feito com este editor
import 'quill/assets/core.styl'
import Microtext from '@/components/common/Microtext'
export default {
  name: 'ContentPage',
  components: {
    Microtext
  },
  head() {
    return {
      title: this.staticPage.title,
      titleTemplate: 'xraM-Memory - %s'
    }
  },
  data() {
    return { staticPage: {} }
  },
  computed: {
    theBody() {
      return sanitize(this.staticPage.body)
    }
  },
  async asyncData({ $axios, route, error }) {
    const { slug } = route.params
    if (slug) {
      try {
        const staticPage = await $axios.$get(`/api/v1/pages/${slug}`)
        return { staticPage }
      } catch (e) {
        const statusCode = (e.response && e.response.status) || 500
        return error({ statusCode })
      }
    }
    return error({ statusCode: 400 })
  }
}
</script>
