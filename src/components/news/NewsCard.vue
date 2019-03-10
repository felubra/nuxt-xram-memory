<template>
  <div class="NewsCard">
    <div class="NewsCard__Body">
      <div class="NewCard__Image">
        <img v-if="image" :src="image" alt @error="removeImage">
      </div>
      <div class="news-text">
        <p v-if="label" class="label">Notícia</p>
        <h3>{{ newsItem.title }}</h3>
        <p class="teaser">{{teaser}}</p>
      </div>
    </div>
    <div v-if="footer" class="NewsCard__Footer">
      <p>
        <strong>{{newspaper.title}}</strong>
        {{published_date}}
      </p>
    </div>
  </div>
</template>

<script>
/**TODO: adicionar prop centered */
const smartTruncate = require('smart-truncate')
const dayJs = require('dayjs')
const { getMediaUrl } = require('~/utils')
export default {
  name: 'NewsCard',
  props: {
    newsItem: {
      type: Object,
      default: function() {
        return {}
      }
    },
    label: {
      type: Boolean,
      default: false
    },
    footer: {
      type: Boolean,
      default: true
    },
    info: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    title() {
      return this.newsItem.title
    },
    teaser() {
      return smartTruncate(this.newsItem.teaser, 300)
    },
    image() {
      try {
        if (
          this.newsItem &&
          this.newsItem.image_capture &&
          typeof this.newsItem.image_capture === 'string'
        ) {
          // path obtido por um resultado do ElasticSearch
          return getMediaUrl(this.newsItem.image_capture)
        } else {
          // path obtido pela API
          return (
            this.newsItem.image_capture.image_document &&
            getMediaUrl(this.newsItem.image_capture.image_document.file)
          )
        }
      } catch {
        /** TODO: retorne um ícone padrão se não houver imagem */
        return ''
      }
    },
    newspaper() {
      if (
        this.newsItem.newspaper &&
        this.newsItem.newspaper.url &&
        this.newsItem.newspaper.title
      ) {
        return {
          url: this.newsItem.newspaper.url,
          title: this.newsItem.newspaper.title
        }
      }
      return false
    },
    published_date() {
      try {
        const dateTime = dayJs(this.newsItem.published_date)
        if (!dateTime.isValid()) {
          throw new Error()
        }
        return dateTime.toDate().toLocaleDateString()
      } catch {
        return ''
      }
    }
  },
  methods: {
    removeImage(e) {
      e.target.remove()
    }
  }
}
</script>

<style>
p.label {
  color: #aa0000;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  font-size: 0.75rem;
  font-family: 'Cabin', sans-serif;
}
div.NewsCard {
  background: #f3f1f1;
  padding: 1rem 1rem 0.6rem 1rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  max-width: 850px;
}

div.NewsCard__Body {
  justify-content: flex-start;
}

div.NewsCard__Body p.teaser {
  display: none;
}

div.NewCard__Image {
  min-width: 15.625rem;
}

div.NewsCard__Body h3 {
  font-weight: 500;
  margin: 0 0 1rem;
  font-size: 1.25rem;
  line-height: 1.2;
}

div.NewsCard__Footer {
  justify-content: flex-end;
}
div.NewsCard__Footer a.newspaper {
  text-transform: uppercase;
  text-decoration: none;
  color: #333333;
}

div.NewsCard__Footer a.newspaper:visited {
  color: #333333;
}

div.NewsCard__Footer p {
  font-family: Cabin, sans-serif;
  font-size: 0.75rem;
  margin: 0;
  padding: 0;
}
@media only screen and (min-width: 768px) {
  div.NewsCard {
    text-align: left;
  }
  div.NewsCard__Body {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    position: relative;
    text-align: left;
  }

  div.NewsCard__Body img {
    align-self: baseline;
    margin: 0 0.5rem 0 0rem;
  }

  div.NewsCard__Footer p {
    font-size: 0.8rem;
    margin: 0.5rem 0 0 0;
  }

  div.NewsCard__Body p.teaser {
    display: block;
    text-align: justify;
    margin: 0;
  }
}
</style>
