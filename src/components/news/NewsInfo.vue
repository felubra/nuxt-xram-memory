<template>
  <dl class="NewsInfo">
    <template v-if="teaser" class="NewsInfo__Field NewsInfo__Field--summary">
      <dt>Resumo</dt>
      <dd>{{teaser}}</dd>
    </template>
    <template v-if="url">
      <dt>Endereço original</dt>
      <dd>
        <a :href="url.url" target="_blank">{{url.url}}</a>
      </dd>
    </template>
    <template v-if="newspaper">
      <dt>Site / veículo</dt>
      <dd>
        <a class="NewsInfo__Newspaper" :href="newspaper.url" target="_blank">
          <img v-if="newspaperIcon" :src="newspaperIcon" alt>
          {{newspaper.title}}
        </a>
      </dd>
    </template>
    <template v-if="published_date">
      <dt>Data de publicação</dt>
      <dd>{{published_date}}</dd>
    </template>
    <template v-if="pdf_captures" class="NewsInfo__Field NewsInfo__Field--stacked">
      <dt>Capturas de página</dt>
      <dd>
        <nuxt-link
          v-for="capture in pdf_captures"
          :key="capture.url"
          class="NewsInfo__PDFCapture"
          :to="{
            name: 'document-document_id',
            params: {
              document_id: capture.document_id
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
    </template>
    <template v-if="subjects">
      <dt>Assuntos</dt>
      <dd class="inline">
        <nuxt-link
          v-for="subject in subjects"
          :key="subject.slug"
          :to="{name:'search-query', query:{ subjects: JSON.stringify([subject.name])} }"
        >{{subject.name}}</nuxt-link>
      </dd>
    </template>
    <template v-if="keywords" class="NewsInfo__Field NewsInfo__Field--multicol">
      <dt>Palavras-chave</dt>
      <dd class="inline">
        <nuxt-link
          v-for="keyword in keywords"
          :key="keyword.slug"
          :to="{name:'search-query', query:{ keywords: JSON.stringify([keyword.name])} }"
        >{{keyword.name}}</nuxt-link>
      </dd>
    </template>
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
              document_id: capture.pdf_document.document_id,
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
    newspaperIcon() {
      try {
        return getMediaUrl(this.newsItem.newspaper.favicon_logo)
      } catch (e) {
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
  watch: {
    pdf_captures: {
      immediate: true,
      handler() {
        this.getDocumentsInfo()
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
        const size = humanSize(parseInt(capture.pdf_document.size, 10))
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
    thumbnailForDocument(document_id) {
      try {
        return getMediaUrl(
          this.documents.find(document => document.document_id === document_id)
            .thumbnail
        )
      } catch {
        return false
      }
    }
  }
}
</script>

<style scoped>
.NewsInfo {
  font-family: 'Cabin', sans-serif;
  word-break: break-word;
}

dt {
  display: block;
  font-weight: normal;
  color: #333;
  text-transform: uppercase;
  margin: 1rem 0 0.1rem;
}

dt:first-of-type {
  margin-top: 0;
}

dd {
  margin: 0;
  padding: 0 0 0.5em 0;
}

dd + dd {
  margin: 0;
}

dd.inline > a {
  display: inline-block;
  margin: 0 1rem 0.5rem 0;
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

.NewsInfo__Field--multicol > dt {
  column-span: all;
}

.NewsInfo__Field--multicol > dd {
  margin: 0.5rem;
}

.NewsInfo__PDFCapture {
  display: inline-block;
  text-align: center;
  margin: 0 0.5rem;
}

.NewsInfo__PDFCapture:first-of-type {
  margin-left: 0;
}

.NewsInfo__PDFCapture > span {
  text-align: center;
  display: block;
  margin-top: 0.5rem;
}
.NewsInfo__PDFCapture > img {
  border: solid 1px #efefef;
  padding: 1rem;
  transition: border 0.25s ease;
}

.NewsInfo__PDFCapture:hover > img {
  border: solid 1px #ff0000;
  padding: 1rem;
}

a.NewsInfo__Newspaper {
  display: flex;
  align-items: center;
}

a.NewsInfo__Newspaper > img {
  margin-right: 0.27rem;
}

@media only screen and (min-width: 768px) {
  dt {
    float: left;
    clear: left;
    width: 7rem;
    margin: 1rem 0 0 0;
    text-align: right;
    font-weight: bold;
    color: #333;
    text-transform: none;
    font-weight: bold;
  }

  dt:first-of-type {
    margin-top: 0;
  }

  dt::after {
    content: ':';
  }
  dd {
    margin: 1rem 0 0 8rem;
    padding: 0 0 0.5em 0;
  }
  dd + dd {
    margin: 0 0 0 8rem;
  }
}
</style>
