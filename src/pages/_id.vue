<template>
  <AbstractPage class="ql-editor pageBody" :title="staticPage.title" :body="staticPage.body"></AbstractPage>
</template>
<script>
import AbstractPage from '~/components/common/AbstractPage'
// Importe os estilos padrão do quill para formatar corretamente o nosso html feito com este editor
import 'quill/assets/core.styl'
export default {
  components: {
    AbstractPage
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
