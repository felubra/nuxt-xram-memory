<template>
  <transition-group class="NewsGrid" name="list-complete" tag="div">
    <NewCard
      v-for="(item, index) in items"
      :key="idFor(item)"
      class="item"
      :item-link="linkFor(item)"
      :label="labelFor(item)"
      :image="imageFor(item)"
      :teaser="teaserFor(item)"
      :title="titleFor(item)"
    >
      <NewspaperInfo v-if="newspaperFor(item)" slot="footer" :newspaper="newspaperFor(item)" />
    </NewCard>
  </transition-group>
</template>

<script>
import NewCard from './NewCard'
import NewspaperInfo from './NewspaperInfo'

const dayJs = require('dayjs')
const smartTruncate = require('smart-truncate')

export default {
  name: 'NewsGrid',
  components: {
    NewCard,
    NewspaperInfo
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    idFor(item) {
      const type = this.typeFor(item)
      switch (type) {
        case 'Imagem':
        case 'Documento': {
          // TODO: suporte a vários tamanhos de imagem
          return type + item.document_id
        }
        default: {
          return type + item.id
        }
      }
    },
    labelFor(item) {
      const values = [this.typeFor(item), this.dateFor(item)]
      return values.filter(value => value).join(' em ')
    },
    dateFor(item) {
      try {
        const dateTime = dayJs(item.published_date)
        if (!dateTime.isValid()) {
          throw new Error()
        }
        return dateTime.toDate().toLocaleDateString()
      } catch {
        return ''
      }
    },
    typeFor(item) {
      try {
        let value = item._type || ''
        if (
          value === 'Documento' &&
          item.mime_type &&
          item.mime_type.includes('image/')
        ) {
          value = 'Imagem'
        }
        return value
      } catch {
        return ''
      }
    },
    newspaperFor(item) {
      try {
        if (item.newspaper) {
          return {
            title: item.newspaper.title,
            image: item.newspaper.favicon_logo,
            url: item.newspaper.url
          }
        }
        return null
      } catch {
        return null
      }
    },
    imageFor(item) {
      switch (this.typeFor(item)) {
        case 'Imagem':
        case 'Documento': {
          // TODO: suporte a vários tamanhos de imagem
          return item.thumbnail
        }
        case 'Notícia': {
          return item.thumbnail
        }
        default: {
          if (Object.keys(item).includes('album_id')) {
            return item.big_cover
          }
          return ''
        }
      }
    },
    titleFor(item) {
      switch (this.typeFor(item)) {
        case 'Imagem':
        case 'Documento': {
          return ''
        }
        default: {
          return item.title
        }
      }
    },
    teaserFor(item) {
      return smartTruncate(item.teaser, 180)
    },
    linkFor(item) {
      switch (this.typeFor(item)) {
        case 'Imagem':
        case 'Documento': {
          return {
            name: 'document-document_id',
            params: { document_id: item.document_id }
          }
        }
        case 'Notícia': {
          return { name: 'news-slug', params: { slug: item.slug } }
        }
        default: {
          if (Object.keys(item).includes('album_id')) {
            return {
              name: 'album-album_id',
              params: {
                album_id: item.album_id
              }
            }
          }
          return { name: 'search' }
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.NewsGrid {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: flex-start;
}

.item {
  margin: 20px;
  width: 250px;
  transition: all 0.25s;
  margin-right: 10px;
}

.list-complete-enter, .list-complete-leave-to {
  opacity: 0;
  transform: translateY(60px);
}

.list-complete-leave-active {
  position: absolute;
}

.NewspaperInfo {
  margin-top: auto;
}
</style>
