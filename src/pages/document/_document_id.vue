<template>
  <AbstractPage class="Page--sidebar Page--aside-after">
    <template v-slot:aside>
      <div class="PageAside FileInfo">
        <p class="microtext">{{fileType}}</p>
        <h1>{{document.document_id || document.name}}</h1>
        <p v-if="document.description" class="FileInfo__Description">{{document.description}}</p>
        <div class="FileActions">
          <a class="FileInfo_Button microtext" download :href="fileURL">
            <i class="material-icons">get_app</i> Baixar
          </a>
        </div>
        <dl>
          <div v-if="size">
            <dt class="microtext">Tamanho</dt>
            <dd>{{size}}</dd>
          </div>
          <div v-if="sendDate">
            <dt class="microtext">Data de envio</dt>
            <dd>{{sendDate}}</dd>
          </div>
        </dl>
      </div>
    </template>
    <no-ssr>
      <component :is="componentType" :file-u-r-l="fileURL"></component>
    </no-ssr>
  </AbstractPage>
</template>
<script>
import UnknownFilePreview from '~/components/viewers/UnknownFilePreview'
import AbstractPage from '~/components/common/AbstractPage'

const humanSize = require('human-size')
const dayJs = require('dayjs')

const { getMediaUrl, sanitize } = require('~/utils')
export default {
  components: {
    AbstractPage,
    UnknownFilePreview,
    PDFFilePreview: () => {
      if (!process.client) {
        return {
          component: UnknownFilePreview
        }
      } else {
        return {
          component: import('../../components/viewers/PDFFilePreview')
        }
      }
    },
    ImageFilePreview: () => {
      if (!process.client) {
        return {
          component: UnknownFilePreview
        }
      } else {
        return {
          component: import('../../components/viewers/ImageFilePreview')
        }
      }
    }
  },
  data() {
    return { document: {}, componentType: '', fileType: '' }
  },
  head() {
    return {
      title: this.document.name,
      titleTemplate: 'xraM-Memory - Documento: %s'
    }
  },
  computed: {
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
        const dateTime = dayJs(this.document.modified_at)
        if (!dateTime.isValid()) {
          throw new Error()
        }
        return dateTime.toDate().toLocaleDateString()
      } catch {
        return ''
      }
    },
    isUnknown() {
      return this.previewComponentType === 'UnknownFilePreview'
    }
  },
  async asyncData({ $axios, route, redirect, error }) {
    const documentId = route.params.document_id
    if (documentId) {
      return $axios
        .$get(`/api/v1/document/${documentId}`)
        .then(document => {
          let componentType = 'UnknownFilePreview'
          let fileType = 'Arquivo'
          try {
            if (document.mime_type === 'application/pdf') {
              componentType = 'PDFFilePreview'
              fileType = 'Documento PDF'
            } else if (document.mime_type.includes('image/')) {
              componentType = 'ImageFilePreview'
              fileType = 'Imagem'
            }
          } catch {}
          return { document, componentType, fileType }
        })
        .catch(e => {
          const statusCode = (e.response && e.response.status) || 500
          error({ statusCode })
        })
    } else {
      error({ statusCode: 404, message: 'Documento não encontrado' })
    }
  }
}
</script>

<style scoped>
h1 {
  font-weight: normal;
  font-size: 1rem;
  word-break: break-all;
  margin: 0;
}

.FilePreview__Label {
  color: inherit;
  font-size: 0.75rem;
  margin-top: 0;
}
.FilePreview__Description {
  margin: 0;
  font-size: 1rem;
}
.FileInfo__Description {
  max-height: 60vh;
  overflow-y: auto;
  color: #333;
  text-align: justify;
}

dl {
  margin: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

dl > div {
  margin: 0.5rem 1rem;
  margin-left: 0;
}

dt {
  margin: 0.5rem 0 0 0;
}
dd {
  margin: 0;
  color: #333;
}

.FileActions {
  display: flex;
  margin: auto 0.5rem;
  padding: 1rem 0;
  justify-content: center;
}

.FileActions > a {
  display: inline-block;
  text-decoration: none;
  text-align: center;
  color: #333;
}

.FileActions > a:hover,
.FileActions > a:focus,
.FileActions > a:active {
  color: #ce5454;
}

.FileInfo_Button > i {
  display: block;
  font-size: 48px;
}
@media only screen and (min-width: 768px) {
  dl {
    justify-content: flex-start;
  }

  .FileActions {
    display: flex;
    padding: 0;
    justify-content: center;
    position: fixed;
    backface-visibility: hidden;
    z-index: 100;
    bottom: 1rem;
    right: 2.5rem;
  }

  .FileActions a {
    opacity: 0.8;
    margin: 0.5rem;
    text-transform: uppercase;
  }

  .FileActions a:hover,
  .FileActions a:focus,
  .FileActions a:active {
    opacity: 1;
  }

  dl {
    margin-top: auto;
  }
  dl > div:first-of-type {
    margin-left: 0;
  }
}
</style>
