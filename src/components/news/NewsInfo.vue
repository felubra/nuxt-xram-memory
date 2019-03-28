<template>
  <dl class="NewsInfo">
    <div v-if="teaser" class="NewsInfo__Field NewsInfo__Field--summary">
      <dt>Resumo</dt>
      <dd>{{teaser}}</dd>
    </div>
    <div v-if="url" class="NewsInfo__Field">
      <dt>Endereço original da notícia</dt>
      <dd>
        <a :href="url.url" target="_blank">{{url.url}}</a>
      </dd>
    </div>
    <div v-if="newspaper" class="NewsInfo__Field">
      <dt>Site / veículo</dt>
      <dd>
        <a :href="newspaper.url" target="_blank">{{newspaper.title}}</a>
      </dd>
    </div>
    <div v-if="published_date" class="NewsInfo__Field">
      <dt>Data de publicação</dt>
      <dd>{{published_date}}</dd>
    </div>
    <div v-if="pdf_captures" class="NewsInfo__Field NewsInfo__Field--stacked">
      <dt>Capturas de página</dt>
      <dd>
        <nuxt-link
          class="NewsInfo__PDFCapture"
          v-for="capture in pdf_captures"
          :key="capture.url"
          :to="{
            name: 'document-id',
            params: {
              id: capture.document_id
            },
          }"
        >
          <img
            v-if="thumbnailForDocument(capture.document_id)"
            :src="thumbnailForDocument(capture.document_id)"
            :alt="capture.title"
            :title="capture.title"
          >
          <span>{{capture.title}}</span>
        </nuxt-link>
      </dd>
    </div>
    <div v-if="subjects" class="NewsInfo__Field">
      <dt>Assuntos</dt>
      <dd>
        <nuxt-link
          v-for="subject in subjects"
          :key="subject.slug"
          :to="{name:'search-query', query:{ subjects: JSON.stringify([subject.name])} }"
        >{{subject.name}}</nuxt-link>
      </dd>
    </div>
    <div v-if="keywords" class="NewsInfo__Field NewsInfo__Field--multicol">
      <dt>Palavras-chave</dt>
      <dd v-for="keyword in keywords" :key="keyword.slug">
        <nuxt-link
          :to="{name:'search-query', query:{ keywords: JSON.stringify([keyword.name])} }"
        >{{keyword.name}}</nuxt-link>
      </dd>
    </div>
  </dl>
</template>

<script>
const smartTruncate = require('smart-truncate')
const humanSize = require('human-size')
const dayJs = require('dayjs')
import { getMediaUrl } from '@/utils'
export default {
  name: 'NewsInfo',
  props: {
    newsItem: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      documents: []
    }
  },
  computed: {
    teaser() {
      return this.newsItem.teaser
    },
    keywords() {
      return (
        this.newsItem.keywords &&
        this.newsItem.keywords.length &&
        this.newsItem.keywords
      )
    },
    subjects() {
      return (
        this.newsItem.subjects &&
        this.newsItem.subjects.length &&
        this.newsItem.subjects
      )
    },
    pdf_captures() {
      try {
        return (
          this.newsItem.pdf_captures &&
          this.newsItem.pdf_captures.map(capture => {
            return {
              document_id: capture.pdf_document.id,
              title: this.captureNameAndSize(capture)
            }
          })
        )
      } catch {
        return ''
      }
    },
    published_date() {
      try {
        const [time, date] = this.newsItem.published_date && [
          new Date(this.newsItem.published_date).toLocaleTimeString(),
          new Date(this.newsItem.published_date).toLocaleDateString()
        ]
        return `${date} ${time}`
      } catch {
        return ''
      }
    },
    newspaper() {
      try {
        return (
          this.newsItem.newspaper &&
          this.newsItem.newspaper.url &&
          this.newsItem.newspaper.title && {
            url: this.newsItem.newspaper.url,
            title: this.newsItem.newspaper.title
          }
        )
      } catch {
        return ''
      }
    },
    url() {
      return {
        url: this.newsItem.url,
        title: smartTruncate(this.newsItem.url, 120, { position: 20 })
      }
    }
  },
  methods: {
    captureNameAndSize(capture) {
      let title = {}
      try {
        const dateTime = dayJs(capture.pdf_capture_date)
        if (!dateTime.isValid()) {
          throw new Error()
        }
        title['date'] = dateTime.toDate().toLocaleDateString()
      } catch {
        // não adicione
      }

      try {
        const size = humanSize(parseInt(capture.pdf_document.file_size, 10))
        title['size'] = size
      } catch {
        // não adicione
      }
      return `${title.date || 'Captura em PDF'} ${
        title.size ? `(${title.size})` : ''
      }`
    },
    getDocumentsInfo() {
      Promise.all(
        this.pdf_captures.map(capture => {
          return this.$axios
            .$get(`/api/v1/document/${capture.document_id}`)
            .then(document => {
              return document
            })
        })
      ).then(documents => {
        this.documents = documents
      })
    },
    thumbnailForDocument(id) {
      try {
        return getMediaUrl(
          this.documents.find(document => document.id === id).thumbnail
        )
      } catch {
        return false
      }
    }
  },
  watch: {
    pdf_captures: {
      immediate: true,
      handler() {
        this.getDocumentsInfo()
      }
    }
  }
}
</script>

<style scoped>
.NewsInfo {
  font-family: 'Cabin', sans-serif;
}

.NewsInfo a {
  color: #aa0000;
  text-decoration: none;
}

dt {
  color: #555555;
  text-transform: uppercase;
  font-weight: bold;
  font-family: 'Cabin', sans-serif;
}
dl {
  position: relative;
  height: 100%;
  margin: 0;
}
dd {
  margin: 0.5rem 0;
}
.NewsInfo__Field:first-child {
  margin-top: 0;
}
.NewsInfo__Field {
  display: flex;
  flex-direction: column;
  margin: 2.5rem 0;
  align-items: flex-start;
}
.NewsInfo__Field--summary {
  font-family: 'Cabin', sans-serif;
}

.NewsInfo__Field--multicol {
}

.NewsInfo__Field--multicol > dt {
  column-span: all;
}

.NewsInfo__Field--multicol > dd {
  margin: 0.5rem;
}

.NewsInfo__PDFCapture {
  display: inline-block;
  text-align: center;
}

.NewsInfo__PDFCapture > span {
  text-align: center;
  display: block;
}

@media only screen and (min-width: 768px) {
  .NewsInfo__Field {
    flex-direction: row;
    align-items: baseline;
  }
  .NewsInfo__Field--stacked {
    flex-direction: column;
  }
  .NewsInfo__Field > dd {
    margin: 0 0 0 1.5rem;
  }
  .NewsInfo__Field--stacked > dd {
    margin: 0.5rem;
  }

  .NewsInfo__Field--stacked > dd::first-child {
    margin-left: 0;
  }

  .NewsInfo__Field > dt {
    display: inline-block;
  }
}
</style>
