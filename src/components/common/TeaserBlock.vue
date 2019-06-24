<template>
  <section v-if="teaser" :class="{'TeaserBlock': true, 'TeaserBlock--home': home}">
    <div class="ql-editor TeaserBlock__Body" v-html="teaser"></div>
    <nuxt-link
      v-if="slug && showLink"
      :to="{name: 'slug', params: {slug: slug} }"
      :class="`TeaserBlock__Link microtext TeaserBlock__Link--${linkPosition}`"
    >{{teaserText}}</nuxt-link>
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
    },
    showLink: {
      type: Boolean,
      default: true
    },
    linkPosition: {
      type: String,
      default: 'right',
      validator(value) {
        return value in ['left', 'center', 'right']
      }
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
    },
    teaserText() {
      return sanitize(this.pageItem.teaser_text) || 'Saiba mais'
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

.TeaserBlock__Link--left {
  text-align: left;
}

.TeaserBlock__Link--center {
  text-align: center;
}

.TeaserBlock__Body {
  font-size: 1rem;
}
.TeaserBlock__Body.ql-editor {
  padding: 0.75rem 0 0;
}
</style>
