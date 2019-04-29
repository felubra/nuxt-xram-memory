<template>
  <section v-if="teaser" :class="{'TeaserBlock': true, 'TeaserBlock--home': home}">
    <div class="ql-editor TeaserBlock__Body" v-html="teaser"></div>
    <nuxt-link
      v-if="slug"
      :to="{name: 'slug', params: {slug: slug} }"
      class="TeaserBlock__Link microtext"
    >Saiba mais</nuxt-link>
  </section>
</template>


<script>
import { sanitize } from '@/utils/'
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
    home: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    teaser() {
      return (
        this.pageItem.teaser !== undefined && sanitize(this.pageItem.teaser)
      )
    },
    slug() {
      return this.pageItem.url !== undefined && sanitize(this.pageItem.url)
    }
  }
}
</script>

<style scoped>
.TeaserBlock {
  max-width: 40.5rem;
  align-self: center;
  width: 100%;
  padding: 0 0.5rem;
}

.TeaserBlock__Link {
  display: block;
  text-align: right;
  font-size: 0.75rem;
}
.TeaserBlock__Body {
  font-size: 1.2 rem;
}
</style>
