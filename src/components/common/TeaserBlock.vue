<template>
  <section v-if="teaser" class="TeaserBlock">
    <div class="TeaserBlock__Body ql-editor" v-html="teaser"></div>
    <nuxt-link
      v-if="slug"
      :to="{name: 'page-slug', params: {slug: slug} }"
      class="TeaserBlock__Link microtext"
    >Saiba mais</nuxt-link>
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
    },
    slug() {
      return this.pageItem.url !== undefined && xss(this.pageItem.url)
    }
  }
}
</script>

<style scoped>
.TeaserBlock__Link {
  display: block;
  text-align: right;
  font-size: 0.75rem;
}
</style>
