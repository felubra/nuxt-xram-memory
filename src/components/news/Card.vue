<script>
/**TODO: adicionar prop centered */
const dayJs = require('dayjs')
const { getMediaUrl, sanitize } = require('~/utils')
const smartTruncate = require('smart-truncate')
const ELEMENTS = ['label', 'title', 'description', 'footer']
export default {
  name: 'Card',
  directives: {
    'card-image-dimensions': {
      inserted: function(imgNode) {
        const src = imgNode.getAttribute('src')
        try {
          let [_, width, height] = src.match(/__(\d+)x(\d+)_/)

          width = parseInt(width)
          height = parseInt(height)

          imgNode.setAttribute('width', width)
          imgNode.setAttribute('height', height)
        } catch {}
      }
    }
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
      return sanitize(this.item.title)
    },
    teaser() {
      return sanitize(smartTruncate(this.item.teaser, 180))
    },
    image() {
      try {
        return (
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
  width: $card-width;
  border: solid 1px #efefef;
  transition: background-color 0.25s ease, color 0.25s ease;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.Card h3 {
  text-align: center;
  font-size: 18px;
  font-weight: 500;
}

.Card > a {
  text-align: center;
  height: 100%;
  padding: 6px;
  transition: background-color 0.25s ease, color 0.15s ease-out;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.Card p {
  color: #333333;
}

.Card h3 {
  margin: auto;
}

.Card p.label {
  font-size: $microtext;
  font-family: $microtext-font;
  text-transform: uppercase;
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
  background: $micro-text !important;
}

.Card:focus-within p, .Card:focus-within p, .Card:focus-within p, .Card:focus-within a, .Card:focus-within a, .Card:focus-within a, .Card:active p, .Card:focus p, .Card:hover p, .Card:active a, .Card:focus a, .Card:hover a {
  color: #fff !important;
}
</style>
