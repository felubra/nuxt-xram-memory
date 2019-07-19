<template>
  <div class="DocumentPage">
    <main>
      <no-ssr>
        <!-- eslint-disable -->
        <DocumentPreview :document="document" />
        <!-- eslint-enable -->
      </no-ssr>
    </main>

    <aside class="FieldList">
      <h1>{{document.document_id || document.name}}</h1>
      <a class="FileInfo_Button" download :href="fileURL">
        <i class="material-icons">get_app</i>
      </a>

      <div v-if="fileType" class="FieldList__Field">
        <Microtext tag="h2">Tipo</Microtext>
        <p>{{fileType}}</p>
      </div>
      <div v-if="size" class="FieldList__Field">
        <Microtext tag="h2">Tamanho</Microtext>
        <p>{{size}}</p>
      </div>
      <div v-if="sendDate" class="FieldList__Field">
        <Microtext tag="h2">Data de envio</Microtext>
        <p>{{sendDate}}</p>
      </div>

      <div v-if="document.description" class="FieldList__Field">
        <Microtext tag="h2">Descrição</Microtext>
        <p>{{document.description}}</p>
      </div>

      <div v-if="newsRelated" class="FieldList__Field FileInfo__NewsRelated">
        <h2>Notícias associadas</h2>
        <p v-for="news in newsRelated" :key="news.slug">
          <nuxt-link
            :to="{
            name:'news-slug',
            params: {
              slug: news.slug
            }
          }"
          >{{news.title}}</nuxt-link>
        </p>
      </div>
    </aside>
  </div>
</template>
<script>
import DocumentPreview from '~/components/viewers/DocumentPreview'
import Microtext from '~/components/common/Microtext'

const humanSize = require('human-size')
const dayJs = require('dayjs')

const { getMediaUrl } = require('~/utils')
export default {
  components: {
    Microtext,
    DocumentPreview
  },
  data() {
    return { document: {} }
  },
  head() {
    return {
      title: this.document.name,
      titleTemplate: 'xraM-Memory - Documento: %s'
    }
  },
  computed: {
    previewURL() {
      if (this.document.mime_type === 'application/pdf') {
        return getMediaUrl(this.document.thumbnails.document_preview)
      }
      return ''
    },
    size() {
      try {
        return humanSize(this.document.size)
      } catch {
        return '0KB'
      }
    },
    fileURL() {
      return getMediaUrl(this.document.canonical_url)
    },
    sendDate() {
      try {
        const dateTime = dayJs(this.document.uploaded_at)
        if (!dateTime.isValid()) {
          throw new Error()
        }
        return dateTime.toDate().toLocaleDateString()
      } catch {
        return ''
      }
    },
    fileType() {
      if (this.document.mime_type === 'application/pdf') {
        return this.isCapture ? 'Captura de notícia em PDF' : 'Documento PDF'
      } else if (this.document.mime_type.includes('image/')) {
        return this.isCapture ? 'Imagem de notícia' : 'Imagem'
      } else {
        return 'Documento'
      }
    },

    newsRelated() {
      return this.document.news_items.length && this.document.news_items
    }
  },
  async asyncData({ $axios, route, error }) {
    const documentId = route.params.document_id
    if (documentId) {
      const document = await $axios.$get(`/api/v1/document/${documentId}`)
      return { document }
    } else {
      error({ statusCode: 404, message: 'Documento não encontrado' })
    }
  }
}
</script>

<style lang="stylus" scoped>
main {
  min-height: 75vh;
  padding: 1rem;
  display: flex;
}

aside {
  max-width: 960px;
  margin: 0 auto;
  position: relative;
}

.FileInfo_Button {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
