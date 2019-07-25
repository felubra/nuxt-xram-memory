<template>
  <div class="NewsInfo FieldList">
    <div v-if="teaser" class="FieldList__Field">
      <h2>Resumo</h2>
      <p>{{teaser}}</p>
    </div>
    <div v-if="url" class="FieldList__Field">
      <h2>Endereço original</h2>
      <p>
        <a :href="url.url" target="_blank">{{url.url}}</a>
      </p>
    </div>
    <div v-if="archivedUrl" class="FieldList__Field">
      <h2>Versão arquivada</h2>
      <p>
        <a :href="archivedUrl.url" target="_blank">{{archivedUrl.url}}</a>
      </p>
    </div>
    <div v-if="newspaper" class="FieldList__Field">
      <h2>Site / veículo</h2>
      <p>
        <a class="NewsInfo__Newspaper" :href="newspaper.url" target="_blank">
          <img v-if="newspaperIcon" :src="newspaperIcon" alt />
          {{newspaper.title}}
        </a>
      </p>
    </div>
    <div v-if="published_date" class="FieldList__Field">
      <h2>Data de publicação</h2>
      <p>{{published_date}}</p>
    </div>
    <div
      v-if="pdf_captures"
      class="FieldList__Field FieldList__Field--centered NewsInfo--pdf-captures"
    >
      <h2>Capturas de página</h2>
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
    <div v-if="subjects" class="FieldList__Field">
      <h2>Assuntos</h2>
      <ul class="taxonomy-list">
        <li v-for="subject in subjects" :key="subject.slug">
          <nuxt-link :to="{name:'subject-slug', params:{ slug: subject.slug} }">{{subject.name}}</nuxt-link>
        </li>
      </ul>
    </div>
    <div v-if="keywords" class="FieldList__Field">
      <h2>Palavras-chave</h2>
      <ul class="taxonomy-list">
        <li v-for="keyword in keywords" :key="keyword.slug">
          <nuxt-link
            :to="{name:'search', query:{ keywords: JSON.stringify([keyword.name])} }"
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
            .thumbnails.document_thumbnail
        )
      } catch {
        return false
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
figure {
  min-height: 250px;
  padding: 0;
  margin: 0;
}

.NewsInfo--pdf-captures a {
  border: solid 1px #efefef;
  margin: 6px;
  width: auto;
  transition: border-color 0.25s ease;
}

.NewsInfo--pdf-captures a:active, .NewsInfo--pdf-captures a:focus, .NewsInfo--pdf-captures a:hover {
  border-color: $link-color;
}

ul.taxonomy-list {
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
}

ul.taxonomy-list > li {
  display: inline-block;
  border: 1px solid transparent;
  line-height: 1.2rem;
  color: #333333;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease;
  padding: 5px;
}

@media only screen and (min-width: $tablet) {
  ul.taxonomy-list > li {
    margin: 0.5rem;
  }
}
</style>
