<template>
  <div class="StaticPage ql-editor">
    <h1 class="StaticPage__Title">{{title}}</h1>
    <div class="StaticPage__Body" v-html="body"></div>
  </div>
</template>

<script>
import xss from 'xss'
import { appClassesXSSFilter } from '@/utils/'
// Importe os estilos padrão do quill para formatar corretamente o nosso html feito com este editor
import 'quill/assets/core.styl'

export default {
  name: 'StaticPage',
  props: {
    pageItem: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    teaser() {
      return (
        this.pageItem.teaser !== undefined &&
        xss(this.pageItem.teaser, appClassesXSSFilter)
      )
    },
    title() {
      return (
        this.pageItem.title !== undefined &&
        xss(this.pageItem.title, appClassesXSSFilter)
      )
    },
    body() {
      return (
        this.pageItem.body !== undefined &&
        xss(this.pageItem.body, appClassesXSSFilter)
      )
    }
  }
}
</script>

<style scoped>
</style>
