<template>
  <section
    v-if="teaser"
    class="TeaserBlock"
  >
    <!-- eslint-disable vue/no-v-html -->
    <div
      class="ql-editor TeaserBlock__Body"
      v-html="teaser"
    />
    <!-- eslint-enable vue/no-v-html -->
    <nuxt-link
      v-if="slug && showLink"
      :to="{name: 'slug', params: {slug: slug} }"
      :class="`TeaserBlock__Link TeaserBlock__Link--${linkPosition}`"
    >
      <Microtext
        tag="span"
        arrow="right"
      >
        {{ teaserText }}
      </Microtext>
    </nuxt-link>
  </section>
</template>

<script>
// Importe os estilos padrão do quill para formatar corretamente o nosso html feito com este editor
import 'quill/assets/core.styl'
import Microtext from '@/components/common/Microtext'

export default {
  name: 'TeaserBlock',
  components: {
    Microtext
  },
  props: {
    pageItem: {
      type: Object,
      required: true
    },
    showLink: {
      type: Boolean,
      default: true
    },
    linkPosition: {
      type: String,
      default: 'right',
      validator (value) {
        return ['left', 'center', 'right'].includes(value)
      }
    }
  },
  computed: {
    teaser () { return this.$utils.sanitize(this.pageItem.teaser) },
    slug () { return this.$utils.sanitize(this.pageItem.url) },
    teaserText () { return this.$utils.sanitize(this.pageItem.teaser_text) || 'Saiba mais' }
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
  text-align: center;
}

.TeaserBlock__Link .microtext {
  font-size: 14px;
}

.TeaserBlock__Link--left {
  text-align: right;
}

.TeaserBlock__Link--right {
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
