<template>
  <Section class="Page CenteredPage">
    <header>
      <Microtext>{{ staticPage.teaser_text }}</Microtext>
      <h1>{{ staticPage.title }}</h1>
    </header>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <main v-html="theBody" />
  </Section>
</template>
<script>
// Importe os estilos padrão do quill para formatar corretamente o nosso html feito com este editor
import 'quill/assets/core.styl'
import Microtext from '@/components/common/Microtext'
export default {
  name: 'ContentPage',
  components: {
    Microtext
  },
  async asyncData ({ $api: { Pages }, route, error }) {
    const { slug } = route.params
    if (slug) {
      try {
        const staticPage = await Pages.getBySlug(slug)
        return { staticPage }
      } catch (e) {
        const statusCode = (e.response && e.response.status) || 500
        return error({ statusCode })
      }
    }
    return error({ statusCode: 400 })
  },
  data () {
    return { staticPage: {} }
  },
  head () {
    return {
      title: this.staticPage.title,
      titleTemplate: 'xraM-Memory - %s'
    }
  },
  computed: {
    theBody () {
      return this.$utils.sanitize(this.staticPage.body)
    }
  }
}
</script>
