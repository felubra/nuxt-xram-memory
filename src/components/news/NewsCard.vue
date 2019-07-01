<template>
  <div class="NewsCard">
    <nuxt-link :to="itemLink">
      <div class="NewsCard__Body">
        <div class="NewCard__Image">
          <img v-if="image" :src="image" alt @error="removeImage" />
        </div>
        <div class="NewsCard__Text">
          <p v-if="showLabel" class="label">{{label}}</p>
          <h3>{{ resultItem.title }}</h3>
          <p class="teaser">{{teaser}}</p>
        </div>
      </div>
    </nuxt-link>
    <div v-if="footer" class="NewsCard__Footer">
      <p class="NewsCard__Newspaper">
        <a :href="newspaper.url">
          <img v-if="newspaperIcon" :src="newspaperIcon" alt />
          <strong>{{newspaper.title}}</strong>
        </a>
      </p>
    </div>
  </div>
</template>

<script>
/**TODO: adicionar prop centered */
const dayJs = require('dayjs')
const { getMediaUrl, sanitize } = require('~/utils')
const smartTruncate = require('smart-truncate')
export default {
  name: 'NewsCard',
  props: {
    resultItem: {
      type: Object,
      default: function() {
        return {}
      }
    },
    showLabel: {
      type: Boolean,
      default: true
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
      return sanitize(this.resultItem.title)
    },
    teaser() {
      return sanitize(smartTruncate(this.resultItem.teaser, 180))
    },
    image() {
      try {
        return (
          (this.resultItem.image_capture &&
            getMediaUrl(this.resultItem.image_capture)) ||
          (this.resultItem.thumbnail && getMediaUrl(this.resultItem.thumbnail))
        )
      } catch {
        /** TODO: retorne um ícone padrão se não houver imagem */
        return ''
      }
    },
    itemLink() {
      switch (this.type) {
        case 'Imagem':
        case 'Documento': {
          return {
            name: 'document-document_id',
            params: { document_id: this.resultItem.document_id }
          }
        }
        case 'Notícia': {
          return { name: 'news-slug', params: { slug: this.resultItem.slug } }
        }
        default: {
          return { name: 'search' }
        }
      }
    },
    type() {
      let value = this.resultItem._type || ''
      if (
        value === 'Documento' &&
        this.resultItem.mime_type &&
        this.resultItem.mime_type.includes('image/')
      ) {
        value = 'Imagem'
      }
      return value
    },
    newspaperIcon() {
      try {
        return getMediaUrl(this.resultItem.newspaper.favicon_logo)
      } catch (e) {
        return ''
      }
    },
    newspaper() {
      if (
        this.resultItem.newspaper &&
        this.resultItem.newspaper.url &&
        this.resultItem.newspaper.title
      ) {
        return {
          url: this.resultItem.newspaper.url,
          title: this.resultItem.newspaper.title
        }
      }
      return false
    },
    published_date() {
      try {
        const dateTime = dayJs(this.resultItem.published_date)
        if (!dateTime.isValid()) {
          throw new Error()
        }
        return dateTime.toDate().toLocaleDateString()
      } catch {
        return ''
      }
    },
    label() {
      const values = [this.type, this.published_date]
      return values.filter(value => value).join(' em ')
    }
  },
  methods: {
    removeImage(e) {
      e.target.remove()
    }
  }
}
</script>

<style lang="stylus" scoped>
p.label {
  color: #aa0000;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  font-size: 0.75rem;
  font-family: 'Cabin', sans-serif;
}

.NewsCard a:hover, .NewsCard a:focus {
  text-decoration: none;
}

.NewsCard {
  background: #f3f1f1;
  padding: 1rem 1rem 0.6rem 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  transition: color 0.25s ease, background-color 0.25s ease;
  color: inherit;
  text-decoration: none;
  border: solid 1px #efefef;
  transition: border 0.25s ease, background-color 0.25s ease;
  display: inline-block;
  background: #faf9f6;
}

.NewsCard h3, .NewsCard p {
  transition: color 0.25s ease;
}

.NewsCard p {
  color: #555;
}

.NewsCard:hover {
  border-color: #ce5454;
}

.NewsCard:hover h3 {
  color: #ce5454;
}

.NewsCard:hover p {
  color: #8c1010;
}

.NewsCard:focus, .NewsCard:active {
  background: #ce5454;
  color: #fff;
}

.NewsCard:focus a, .NewsCard:active h3, .NewsCard:focus h3, .NewsCard:focus h3, .NewsCard:active p, .NewsCard:focus p {
  color: #fff;
  outline-color: #fff;
}

div.NewsCard__Body {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
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

p.NewsCard__Newspaper {
  font-family: Cabin, sans-serif;
  font-size: 0.75rem;
  margin: 0;
  padding: 0;
}

p.NewsCard__Newspaper a {
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
}

p.NewsCard__Newspaper img {
  margin-right: 0.27rem;
}
</style>
