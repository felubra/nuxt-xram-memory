<template>
  <section class="ErrorPage">
    <h1>{{ title }}</h1>
    <nuxt-link
      class="active"
      to="/"
    >
      <Microtext arrow="left">
        Voltar à página inicial
      </Microtext>
    </nuxt-link>
    <client-only>
      <D3TagCloud
        hi-color="#999"
        class="TagCloud"
        :keywords="errorKeywords"
      />
    </client-only>
  </section>
</template>

<script>
import D3TagCloud from '~/components/tag-cloud/D3TagCloud'
import { TAGCLOUD_NUM_KEYWORDS } from '@/config/constants'
import Microtext from '@/components/common/Microtext'
const FONT_SIZE_DELTA = 16
export default {
  components: {
    D3TagCloud,
    Microtext
  },
  props: {
    error: {
      type: Object,
      default: () => ({
        statusCode: 500
      })
    }
  },
  head () {
    return {
      title: this.title,
      titleTemplate: 'xraM-Memory - %s',
      bodyAttrs: {
        class: 'Navbar--no-logo'
      }
    }
  },
  computed: {
    title () {
      return this.error.statusCode === 404
        ? 'Página não encontrada'
        : 'Oops, infelizmente um erro aconteceu.'
    },
    errorKeywords () {
      try {
        const keywords = []
        for (let i = 0; i < TAGCLOUD_NUM_KEYWORDS; i++) {
          keywords.push({
            text: this.error.statusCode || '500',
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
  }
}
</script>

<style lang="stylus" scoped>
section.ErrorPage
  flex-grow: 1
  text-align: center
  display: flex
  flex-direction: column

h1
  font-weight: bold

.TagCloud
  margin: auto 0
</style>
