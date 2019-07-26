<template>
  <section class="Page DocumentPage">
    <main>
      <BackButton class="BackButton" />
      <template v-if="isOfKnownType">
        <no-ssr>
          <!-- eslint-disable -->
          <DocumentPreview :document="document" />
          <!-- eslint-enable -->
        </no-ssr>
      </template>
      <template v-else>
        <div class="NoPreview">
          <p>
            <i class="material-icons">error</i>
            Infelizmente não temos uma visualização para este tipo de documento.
          </p>
          <p>
            <a class="FileInfo_Button" download :href="fileURL">
              <i class="material-icons">get_app</i>
              Baixar o arquivo
            </a>
          </p>
        </div>
      </template>
    </main>

    <aside class="FieldList">
      <header>
        <h1>{{document.document_id || document.name}}</h1>
        <a class="FileInfo_Button el-button el-button--default is-circle" download :href="fileURL">
          <i class="material-icons">get_app</i>
        </a>
      </header>

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
  </section>
</template>
<script>
import DocumentPreview from '~/components/viewers/DocumentPreview'
import Microtext from '~/components/common/Microtext'
import BackButton from '@/components/common/BackButton'

const humanSize = require('human-size')
const dayJs = require('dayjs')

const { getMediaUrl } = require('~/utils')
export default {
  name: 'DocumentPage',
  components: {
    Microtext,
    DocumentPreview,
    BackButton
  },
  data() {
    return { document: {} }
  },
  head() {
    return {
      title: this.document.name,
      titleTemplate: 'xraM-Memory - Documento: %s',
      bodyAttrs: {
        class: 'page--full-screen'
      }
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
    isOfKnownType() {
      return (
        this.document.mime_type === 'application/pdf' ||
        this.document.mime_type.startsWith('image/')
      )
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
.BackButton {
  z-index: 9;
  position: absolute;
  top: 48px;
  left: 24px;
}

.DocumentPage {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 0;
}

main {
  padding: 1rem;
  display: flex;
  flex-grow: 1;
  min-height: 75vh;
}

aside {
  max-width: 960px;
  margin: 0 auto;
  position: relative;
  padding: 1rem;
  width: 100%;
}

.NoPreview {
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
}

.NoPreview i {
  display: block;
}

.NoPreview p > i {
  text-align: center;
  font-size: 72px;
  color: #888;
  margin: 1rem 0 0;
}

aside > header {
  display: flex;
  align-items: center;
}

.FileInfo_Button {
  margin-left: auto;
  color: #606266;
}

.FileInfo_Button i {
  font-size: 24px;
}
</style>
