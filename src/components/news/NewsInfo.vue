<template>
  <dl class="NewsInfo">
    <div v-if="url" class="NewsInfo__Field">
      <dt>Endereço original</dt>
      <dd>
        <a :href="url.url" target="_blank">Link original</a>
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
    <div v-if="pdf_captures" class="NewsInfo__Field">
      <dt>Capturas em PDF</dt>
      <dd>
        <nuxt-link
          v-for="capture in pdf_captures"
          :key="capture.url"
          :to="{
            name: 'document-id',
            params: {
              id: capture.document_id
            },
          }"
        >{{capture.title}}</nuxt-link>
      </dd>
    </div>
    <div v-if="subjects" class="NewsInfo__Field">
      <dt>Assuntos</dt>
      <dd>
        <nuxt-link
          v-for="subject in subjects"
          :key="subject.slug"
          :to="{name:'subject-slug', params:{ slug: subject.slug}, query:  {title:subject.name } }"
        >{{subject.name}}</nuxt-link>
      </dd>
    </div>
    <div v-if="keywords" class="NewsInfo__Field NewsInfo__Field--multicol">
      <dt>Palavras-chave</dt>
      <dd v-for="keyword in keywords" :key="keyword.slug">
        <nuxt-link
          :to="{name:'keyword-slug', params:{ slug: keyword.slug}, query:  {title:keyword.name } }"
        >{{keyword.name}}</nuxt-link>
      </dd>
    </div>
    <div v-if="teaser" class="NewsInfo__Field NewsInfo__Field--summary">
      <dt>Resumo</dt>
      <dd>{{teaser}}</dd>
    </div>
  </dl>
</template>

<script>
const smartTruncate = require('smart-truncate')
const humanSize = require('human-size')
const dayJs = require('dayjs')
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
  font-size: 0.75rem;
  font-family: 'Cabin', sans-serif;
}
dl {
  background: #e0e0e0;
  position: relative;
  height: 100%;
  padding: 0.75rem;
  margin: 0;
}
dd {
  margin: 0.5rem 0;
  font-size: 0.875rem;
}
.NewsInfo__Field:first-child {
  margin-top: 0;
}
.NewsInfo__Field {
  margin: 1rem 0;
}
.NewsInfo__Field--multicol {
  column-count: 3;
}

.NewsInfo__Field--multicol > dd {
  display: inline-block;
}

.NewsInfo__Field--multicol > dt {
  column-span: all;
}

.NewsInfo__Field--summary {
  font-family: 'Cabin', sans-serif;
}
</style>
