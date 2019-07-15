<script>
/**TODO: adicionar prop centered */
const dayJs = require('dayjs')
const { getMediaUrl, sanitize, cardImageDimensions } = require('~/utils')
const smartTruncate = require('smart-truncate')
const ELEMENTS = ['label', 'title', 'description', 'footer']
export default {
  name: 'Card',
  directives: {
    cardImageDimensions
  },
  props: {
    item: {
      type: Object,
      default: function() {
        return {}
      }
    },
    elements: {
      type: Array,
      default: () => ELEMENTS,
      validator(values) {
        return values.filter(value => ELEMENTS.includes(value)).length > 0
      }
    }
  },
  computed: {
    title() {
      return sanitize(this.item.title) || sanitize(this.item.name)
    },
    teaser() {
      return sanitize(smartTruncate(this.item.teaser, 180))
    },
    image() {
      try {
        return (
          (this.item.cover && getMediaUrl(this.item.cover)) ||
          (this.item.image_capture && getMediaUrl(this.item.image_capture)) ||
          (this.item.thumbnail && getMediaUrl(this.item.thumbnail))
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
            params: { document_id: this.item.document_id }
          }
        }
        case 'Notícia': {
          return { name: 'news-slug', params: { slug: this.item.slug } }
        }
        default: {
          if (Object.keys(this.item).includes('album_id')) {
            return {
              name: 'album-album_id',
              params: {
                album_id: this.item.album_id
              }
            }
          }
          return { name: 'search' }
        }
      }
    },
    type() {
      let value = this.item._type || ''
      if (
        value === 'Documento' &&
        this.item.mime_type &&
        this.item.mime_type.includes('image/')
      ) {
        value = 'Imagem'
      }
      return value
    },
    newspaperIcon() {
      try {
        return getMediaUrl(this.item.newspaper.favicon_logo)
      } catch (e) {
        return ''
      }
    },
    newspaper() {
      if (
        this.item.newspaper &&
        this.item.newspaper.url &&
        this.item.newspaper.title
      ) {
        return {
          url: this.item.newspaper.url,
          title: this.item.newspaper.title
        }
      }
      return false
    },
    published_date() {
      try {
        const dateTime = dayJs(this.item.published_date)
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
<style lang="stylus">
.Card {
  background-image: linear-gradient(rgba(250, 249, 246, 1) 0%, rgba(255, 255, 255, 1) 25%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  justify-content: flex-end;
  justify-content: flex-end;
  border: solid 1px #efefef;
  transition: box-shadow 0.15s ease, border-color 0.15s ease;
  width: 250px;
  text-align: center;
  position: relative;
}

.Card h3 {
  text-align: center;
  font-size: 18px;
  font-weight: 500;
}

.Card > a {
  text-align: center;
  transition: background-color 0.25s ease, color 0.15s ease-out;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  word-break: break-all;
  width: 100%;
  padding: 0;
  align-items: center;
}

.Card p, .Card h3 {
  word-break: break-word;
  padding: 0.5rem;
}

.Card p {
  color: #333333;
}

.Card h3 {
  margin: auto;
}

.Card p.label {
  text-align: center;
}

.Card img {
  filter: grayscale(60%);
  transition: opacity 0.25s ease;
}

.Card a:hover, .Card a:active, .Card a:focus {
  outline: none;
}

.Card:focus-within img, .Card:active img, .Card:focus img, .Card:hover img {
  filter: none;
}

.Card:focus-within, .Card:active, .Card:focus, .Card:hover {
  box-shadow: 0px 5px 25px #efefef;
  border-color: rgb(206, 84, 84);
}

.microtext {
  justify-content: center;
}
</style>
