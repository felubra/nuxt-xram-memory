<template>
  <section class="Page">
    <div class="centered">
      <h1>{{title}}</h1>
      <nuxt-link class="active" to="/">Voltar à página inicial</nuxt-link>
      <D3TagCloud hi-color="#999" class="TagCloud" :keywords="errorKeywords"/>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/common/Logo'
import D3TagCloud from '~/components/tag-cloud/D3TagCloud'
import { TAGCLOUD_NUM_KEYWORDS } from '@/config/constants'
const FONT_SIZE_DELTA = 16
export default {
  components: {
    Logo,
    D3TagCloud
  },
  props: ['error'],
  computed: {
    title() {
      return this.error.statusCode === 404
        ? 'Página não encontrada'
        : 'Opps, infelizmente um erro aconteceu.'
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

<style scoped>
div.centered {
  margin-top: auto;
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
}
h1 {
  font-size: 2rem;
}
a {
  font-size: 1.2rem;
  text-decoration: none;
}
</style>
