<template>
  <AbstractPage class="Page--sidebar Page--document">
    <template v-slot:aside>
      <div class="FileInfo">
        <p class="FilePreview__Label microtext">{{type}}</p>
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
        <a class="FileInfo_Button" download :href="fileURL">
          <i class="material-icons">get_app</i> Download
        </a>
      </div>
    </template>
    <component :is="previewComponentType" :fileURL="fileURL"></component>
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
      if (typeof window !== 'undefined') {
        return import(/* webpackChunkName: "PDFFilePreview" */ '~/components/viewers/PDFFilePreview')
      }
      return {} // não carregue este componente server-side
    },
    ImageFilePreview: () =>
      import(/* webpackChunkName: "ImageFilePreview" */ '~/components/viewers/ImageFilePreview')
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
    previewComponentType() {
      try {
        if (this.document && this.document.mime_type) {
          if (this.document.mime_type === 'application/pdf') {
            if (typeof window !== 'undefined') {
              return 'PDFFilePreview'
            } else {
              return 'UnknownFilePreview'
            }
          } else if (this.document.mime_type.includes('image/')) {
            return 'ImageFilePreview'
          } else {
            return 'UnknownFilePreview'
          }
        }
      } catch {
        return 'UnknownFilePreview'
      }
      return 'UnknownFilePreview'
    },
    type() {
      switch (this.previewComponentType) {
        case 'PDFFilePreview':
          return 'Documento PDF'
        case 'ImageFilePreview':
          return 'Imagem'
        default:
          return 'Arquivo'
      }
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
  async asyncData({ $axios, route }) {
    const documentId = parseInt(route.params.id) || null
    return $axios.$get(`/api/v1/document/${documentId}`).then(document => {
      return { document }
    })
  }
}
</script>

<style scoped>
h1 {
  font-weight: normal;
  font-size: 1.375rem;
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
}

dl {
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

.FileInfo_Button {
  display: inline-block;
  text-decoration: none;
  text-align: center;
}
.FileInfo_Button {
  color: #333;
}

.FileInfo_Button:hover,
.FileInfo_Button:focus,
.FileInfo_Button:active {
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
}
</style>

