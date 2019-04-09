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
  computed: {
    theBody() {
      return sanitize(this.staticPage.body)
    }
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

<style scoped>
.pageBody {
  padding: 0;
}
</style>
