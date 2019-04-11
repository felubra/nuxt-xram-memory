<template>
  <AbstractPage class="Page--sidebar Page--document">
    <template v-slot:aside>
      <div class="FileInfo">
        <p class="FilePreview__Label microtext">{{fileType}}</p>
        <h1>{{document.name}}</h1>
        <dl>
          <div v-if="document.description">
            <dt class="microtext">Descrição</dt>
            <dd>{{document.description}}</dd>
          </div>
          <div v-if="size">
            <dt class="microtext">Tamanho</dt>
            <dd>{{size}}</dd>
          </div>
          <div v-if="sendDate">
            <dt class="microtext">Data de envio</dt>
            <dd>{{sendDate}}</dd>
          </div>
        </dl>
        <div class="FileActions">
          <a class="FileInfo_Button" download :href="fileURL">
            <i class="material-icons">get_app</i> Download
          </a>
        </div>
      </div>
    </template>
    <component :is="componentType" :fileURL="fileURL"></component>
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
    UnknownFilePreview
  },
  data() {
    return { document: {}, componentType: {}, fileType: '' }
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
    const documentId = parseInt(route.params.id, 10) || null
    if (!!documentId) {
      return $axios.$get(`/api/v1/document/${documentId}`).then(document => {
        let componentType = 'UnknownFilePreview'
        let fileType = 'Arquivo'
        if (!process.client) {
          redirect(getMediaUrl(document.canonical_url))
        }
        try {
          if (document.mime_type === 'application/pdf') {
            componentType = () => ({
              component: import('../../components/viewers/PDFFilePreview'),
              error: UnknownFilePreview
            })
            fileType = 'Documento PDF'
          } else if (document.mime_type.includes('image/')) {
            componentType = () => ({
              component: import('~/components/viewers/ImageFilePreview'),
              error: UnknownFilePreview
            })
            fileType = 'Imagem'
          }
        } catch {}
        return { document, componentType, fileType }
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
.FileInfo {
  flex-basis: 350px;
  font-family: 'Cabin', 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
    sans-serif;
  padding: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100%;
}

dl {
  margin: 0;
  display: flex;
  justify-content: center;
}

dl > div {
  margin: 0.5rem;
}

dt {
  margin: 0.5rem 0 0 0;
}
dd {
  margin: 0;
}

.FileActions {
  display: flex;
  margin: auto 0.5rem;
  padding: 2rem 0 0;
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
  .FileInfo {
    text-align: left;
  }
  dl {
    justify-content: flex-start;
  }

  dl > div:first-of-type {
    margin-left: 0;
  }
}
</style>

