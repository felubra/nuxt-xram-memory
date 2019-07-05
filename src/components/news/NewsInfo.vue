<template>
  <div class="NewsInfo">
    <div v-if="teaser" class="NewsInfo__Field NewsInfo__Field--summary">
      <h2 class="microtext">Resumo</h2>
      <p>{{teaser}}</p>
    </div>
    <div v-if="url">
      <h2 class="microtext">Endereço original</h2>
      <p>
        <a :href="url.url" target="_blank">{{url.url}}</a>
      </p>
    </div>
    <div v-if="archivedUrl">
      <h2 class="microtext">Versão arquivada</h2>
      <p>
        <a :href="archivedUrl.url" target="_blank">{{archivedUrl.url}}</a>
      </p>
    </div>
    <div v-if="newspaper">
      <h2 class="microtext">Site / veículo</h2>
      <p>
        <a class="NewsInfo__Newspaper" :href="newspaper.url" target="_blank">
          <img v-if="newspaperIcon" :src="newspaperIcon" alt />
          {{newspaper.title}}
        </a>
      </p>
    </div>
    <div v-if="published_date">
      <h2 class="microtext">Data de publicação</h2>
      <p>{{published_date}}</p>
    </div>
    <div
      v-if="pdf_captures"
      class="NewsInfo__Field NewsInfo__Field--centered NewsInfo__Field--pdf-captures"
    >
      <h2 class="microtext">Capturas de página</h2>
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
        <figure>
          <img
            v-if="thumbnailForDocument(capture.document_id)"
            :src="thumbnailForDocument(capture.document_id)"
            :alt="capture.title"
            :title="capture.title"
          />
          <figcaption>{{capture.title}}</figcaption>
        </figure>
      </nuxt-link>
    </div>
    <div v-if="subjects">
      <h2 class="microtext">Assuntos</h2>
      <p class="inline">
        <nuxt-link
          v-for="subject in subjects"
          :key="subject.slug"
          :to="{name:'search-query', query:{ subjects: JSON.stringify([subject.name])} }"
        >{{subject.name}}</nuxt-link>
      </p>
    </div>
    <div v-if="keywords" class="NewsInfo__Field NewsInfo__Field--multicol">
      <h2 class="microtext">Palavras-chave</h2>
      <ul class="tag-list">
        <li v-for="keyword in keywords" :key="keyword.slug">
          <nuxt-link
            :to="{name:'index', query:{ keywords: JSON.stringify([keyword.name])} }"
          >{{keyword.name}}</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
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
    },
    archivedUrl() {
      if (this.newsItem.archived_news_url) {
        return {
          url: this.newsItem.archived_news_url,
          title: smartTruncate(this.newsItem.archived_news_url, 120, {
            position: 20
          })
        }
      }
      return ''
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
      )
        .then(documents => {
          this.documents = documents
        })
        .catch(() => (this.documents = []))
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

<style lang="stylus" scoped>
.NewsInfo > div {
  display: flex;
  flex-direction: column;
}

.NewsInfo > div > h2, .NewsInfo > div > p {
  margin: 0 1rem 1rem;
}

.NewsInfo > div > * {
  width: 85%;
}

.NewsInfo > div > h2 {
  width: 15%;
  display: inline-block;
  color: #555;
  font-weight: bold;
  text-align: left;
  display: flex;
}

.NewsInfo figure {
  text-align: center;
  margin: 0.1rem;
}

.NewsInfo, .NewsInfo h2 {
  font-family: $sans-serif;
}

.NewsInfo__Field--pdf-captures a {
  border: solid 1px #ccc;
  margin: 6px;
  width: auto;
}

.NewsInfo__Field--pdf-captures {
  align-items: flex-start;
}

.NewsInfo__Field--pdf-captures a:active, .NewsInfo__Field--pdf-captures a:focus, .NewsInfo__Field--pdf-captures a:hover {
  border-color: $link-color;
}

ul.tag-list > li {
  display: inline-block;
  margin: 0.5rem;
  border: 1px solid transparent;
  padding: 5px 12px;
  line-height: 1.2rem;
  color: #333333;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease;
}

.NewsInfo a {
  word-break: break-all;
  display: inline-block;
}

@media only screen and (min-width: $tablet) {
  .NewsInfo > div {
    flex-direction: row;
    align-items: baseline;
  }

  .NewsInfo > .NewsInfo__Field--centered {
    align-items: center;
  }
}
</style>
