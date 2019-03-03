<template>
  <section class="TeaserBlock">
    <div v-if="teaser" class="ql-editor" v-html="teaser"></div>
  </section>
</template>


<script>
import xss from 'xss'
import { appClassesXSSFilter } from '@/utils/'
// Importe os estilos padrão do quill para formatar corretamente o nosso html feito com este editor
import 'quill/assets/core.styl'

export default {
  name: 'TeaserBlock',
  props: {
    pageItem: {
      type: Object,
      default: function() {
        return {}
      }
    },
    mode: {
      type: String,
      default: 'full',
      validator: function(value) {
        return ['full', 'teaser'].includes(value)
      }
    }
  },
  computed: {
    teaser() {
      return (
        this.pageItem.teaser !== undefined &&
        xss(this.pageItem.teaser, appClassesXSSFilter)
      )
    }
  }
}
</script>
