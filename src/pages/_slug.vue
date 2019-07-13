<template>
  <AbstractPage class="ql-editor pageBody">
    <template v-slot:header>
      <div class="content-container">
        <Microtext tag="h1">{{staticPage.title}}</Microtext>
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
import Microtext from '@/components/common/Microtext'
export default {
  components: {
    AbstractPage,
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
