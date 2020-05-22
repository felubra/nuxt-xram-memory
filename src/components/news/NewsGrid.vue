<template>
  <transition-group class="NewsGrid" name="list-complete" tag="div">
    <Card
      v-for="item in items"
      :key="idFor(item)"
      class="item"
      :item-link="linkFor(item)"
      :label="labelFor(item)"
      :image="imageFor(item)"
      :teaser="teaserFor(item)"
      :title="titleFor(item)"
    >
      <NewspaperInfo v-if="newspaperFor(item)" slot="footer" :newspaper="newspaperFor(item)" />
    </Card>
  </transition-group>
</template>

<script>
import Card from '@/components/common/Card'
import NewspaperInfo from './NewspaperInfo'
import { NEWS, DOCUMENT, IMAGE, CONTENT_TYPE_LABELS } from '@/config/constants'

const dayJs = require('dayjs')
const smartTruncate = require('smart-truncate')

export default {
  name: 'NewsGrid',
  components: {
    Card,
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
      return type + item.id
    },
    labelFor(item) {
      const values = [
        CONTENT_TYPE_LABELS[this.typeFor(item)],
        this.dateFor(item)
      ]
      return values.filter(value => value).join(' - ')
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
        let value = item.type || ''
        if (
          value === DOCUMENT &&
          item.mime_type &&
          item.mime_type.includes('image/')
        ) {
          value = IMAGE
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
        case IMAGE:
        case DOCUMENT: {
          // TODO: suporte a vários tamanhos de imagem
          return item.thumbnail
        }
        case NEWS: {
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
        case IMAGE:
        case DOCUMENT: {
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
        case IMAGE:
        case DOCUMENT: {
          return {
            name: 'document-document_id',
            params: { document_id: item.uri }
          }
        }
        case NEWS: {
          return { name: 'news-slug', params: { slug: item.uri } }
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
  align-items: center;
}

.item {
  margin: 20px;
  width: 100%;
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

@media only screen and (min-width: 768px) {
  .item {
    width: 250px;
  }
}
</style>
