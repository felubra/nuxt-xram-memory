<template>
  <section>
    <h1>{{title}}</h1>
    <nuxt-link class="active" to="/">Voltar à página inicial</nuxt-link>
    <no-ssr>
      <D3TagCloud hi-color="#999" class="TagCloud" :keywords="errorKeywords" />
    </no-ssr>
  </section>
</template>

<script>
import D3TagCloud from '~/components/tag-cloud/D3TagCloud'
import { TAGCLOUD_NUM_KEYWORDS } from '@/config/constants'
const FONT_SIZE_DELTA = 16
export default {
  components: {
    D3TagCloud
  },
  props: ['error'],
  computed: {
    title() {
      return this.error.statusCode === 404
        ? 'Página não encontrada'
        : 'Oops, infelizmente um erro aconteceu.'
    },
    errorKeywords() {
      try {
        const keywords = []
        for (let i = 0; i < TAGCLOUD_NUM_KEYWORDS; i++) {
          keywords.push({
            text: this.error.statusCode || 'erro',
            size: Math.random() * 8 * FONT_SIZE_DELTA,
            link: {
              name: 'index'
            }
          })
        }
        keywords.push({
          text: this.error.statusCode || 'erro',
          size: 220,
          color: '#333',
          link: {
            name: 'index'
          }
        })
        return keywords
      } catch {
        return []
      }
    }
  },
  head() {
    return {
      title: this.title,
      titleTemplate: 'xraM-Memory - %s',
      bodyAttrs: {
        class: 'Navbar--no-logo'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
section {
  flex-grow: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
}

h1 {
  margin-top: auto;
  margin-bottom: 0;
  font-weight: bold;
}

.TagCloud {
  margin: auto 0;
}
</style>
