<template>
  <AbstractPage class="Page--sidebar Page--aside-after">
    <template v-slot:aside>
      <div class="PageAside AlbumInfo">
        <p class="microtext">Album de fotos</p>
        <h1>{{album.name}}</h1>
      </div>
    </template>
    <ImageFilePreview :file-u-r-l="fileURL"></ImageFilePreview>
    <no-ssr>
      <resize-sensor @resize="selectImageSize"></resize-sensor>
    </no-ssr>
  </AbstractPage>
</template>
<script>
import ImageFilePreview from '~/components/viewers/ImageFilePreview'
import AbstractPage from '~/components/common/AbstractPage'

const { getMediaUrl, sanitize } = require('~/utils')
export default {
  components: {
    AbstractPage,
    ImageFilePreview
  },
  data() {
    return {
      album: {},
      selectedPhotoIndex: 0,
      selectedImageSize: null
    }
  },
  head() {
    return {
      title: this.album.name,
      titleTemplate: 'xraM-Memory - Álbum de fotos: %s'
    }
  },
  computed: {
    availableSizes() {
      return Object.keys(this.selectedPhoto.thumbnails)
        .filter(thumbnailName => parseInt(thumbnailName, 10))
        .map(size => parseInt(size, 10))
    },
    failbackSize() {
      return Math.min(...this.availableSizes)
    },
    fileURL() {
      const selectedImageSize = this.selectedImageSize || this.failbackSize
      return getMediaUrl(this.selectedPhoto.thumbnails[selectedImageSize])
    },
    photos() {
      return this.album.photos
    },
    selectedPhoto() {
      return this.photos[this.selectedPhotoIndex]
    }
  },
  async asyncData({ $axios, route, redirect, error }) {
    const albumId = parseInt(route.params.id, 10) || null
    if (albumId) {
      return $axios.$get(`/api/v1/album/${albumId}`).then(album => {
        return { album }
      })
    } else {
      error({ statusCode: 404, message: 'Álbum não encontrado' })
    }
  },
  methods: {
    selectImageSize({ width, height }) {
      const largestSide = Math.max(width, height)
      const candidateSizes = this.availableSizes.filter(
        availableSize => largestSide >= availableSize
      )
      this.selectedImageSize = candidateSizes.length
        ? Math.max(...candidateSizes)
        : this.failbackSize
    }
  }
}
</script>

<style scoped>
h1 {
  font-weight: normal;
  font-size: 1rem;
  word-break: break-all;
  margin: 0;
}

p.microtext + h1 {
  margin: 0;
}

.FilePreview__Label {
  color: inherit;
  font-size: 0.75rem;
  margin-top: 0;
}
.FilePreview__Description {
  margin: 0;
  font-size: 1rem;
}

.FileInfo__Description {
  max-height: 60vh;
  overflow-y: auto;
  color: #333;
  text-align: justify;
}

dl {
  margin: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

dl > div {
  margin: 0.5rem 1rem;
  margin-left: 0;
}

dt {
  margin: 0.5rem 0 0 0;
}
dd {
  margin: 0;
  color: #333;
}

.FileActions {
  display: flex;
  margin: auto 0.5rem;
  padding: 1rem 0;
  justify-content: center;
}

.FileActions > a {
  display: inline-block;
  text-decoration: none;
  text-align: center;
  color: #333;
}

.FileActions > a:hover,
.FileActions > a:focus,
.FileActions > a:active {
  color: #ce5454;
}

.FileInfo_Button > i {
  display: block;
  font-size: 48px;
}
@media only screen and (min-width: 768px) {
  dl {
    justify-content: flex-start;
  }

  .FileActions {
    display: flex;
    padding: 0;
    justify-content: center;
    position: fixed;
    backface-visibility: hidden;
    z-index: 100;
    bottom: 1rem;
    right: 2.5rem;
  }

  .FileActions a {
    opacity: 0.8;
    margin: 0.5rem;
    text-transform: uppercase;
  }

  .FileActions a:hover,
  .FileActions a:focus,
  .FileActions a:active {
    opacity: 1;
  }

  dl {
    margin-top: auto;
  }
  dl > div:first-of-type {
    margin-left: 0;
  }
}
</style>
