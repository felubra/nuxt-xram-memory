<template>
  <AbstractPage class="ql-editor pageBody">
    <template v-slot:header>
      <div class="content-container">
        <h1>{{staticPage.title}}</h1>
      </div>
    </template>
    <div class="content-container" v-html="theBody"></div>
  </AbstractPage>
</template>
<script>
import { sanitize } from '@/utils/'
import AbstractPage from '~/components/common/AbstractPage'
// Importe os estilos padrão do quill para formatar corretamente o nosso html feito com este editor
import 'quill/assets/core.styl'
export default {
  components: {
    AbstractPage
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
    const slug = route.params.slug
    return $axios
      .$get(`/api/v1/pages/${slug}`)
      .then(staticPage => {
        return { staticPage }
      })
      .catch(e => {
        const statusCode = (e.response && e.response.status) || 500
        error({ statusCode })
      })
  }
}
</script>

<style scoped>
.pageBody {
  padding: 0;
}
</style>
