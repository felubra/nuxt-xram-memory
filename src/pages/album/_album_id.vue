<template>
  <div class="AlbumPage">
    <main>
      <viewer class="Album__Viewer" :options="viewerOptions" :images="photos" @inited="inited">
        <template slot-scope="scope">
          <img
            v-for="image in scope.images"
            :key="image.id"
            class="ImageFilePreview__OriginalImage"
            :src="getMediaURL(image.thumbnail)"
            :originalURL="getMediaURL(image.canonical_url)"
          />
        </template>
      </viewer>
      <no-ssr>
        <resize-sensor @resize="selectImageSize"></resize-sensor>
      </no-ssr>
    </main>
    <aside class="PageAside AlbumInfo FieldList">
      <div v-if="fileDescription" class="FieldList__Field">
        <Microtext tag="h2">Descrição</Microtext>
        <p>{{fileDescription}}</p>
      </div>
    </aside>
  </div>
</template>
<script>
import AbstractPage from '~/components/common/AbstractPage'
import Microtext from '~/components/common/Microtext'
const humanSize = require('human-size')

const { getMediaUrl } = require('~/utils')
export default {
  components: {
    AbstractPage,
    Microtext
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
      return this.getMediaURL(this.selectedPhoto.canonical_url)
    },
    photos() {
      return this.album.photos
    },
    fileCount() {
      return this.album.file_count
    },
    fileName() {
      return this.selectedPhoto.name
    },
    fileDescription() {
      return this.selectedPhoto.description
    },
    fileSize() {
      try {
        return humanSize(this.selectedPhoto.size)
      } catch {
        return '0KB'
      }
    },
    hasNext() {
      return this.selectedPhotoIndex + 1 < this.fileCount
    },
    hasPrev() {
      return this.selectedPhotoIndex > 0
    },
    selectedPhoto() {
      return this.photos[this.selectedPhotoIndex]
    },
    photosForTheViewer() {
      return this.photos.map(photo =>
        getMediaUrl(photo.thumbnails[this.selectedImageSize])
      )
    },
    viewerOptions() {
      return {
        inline: true,
        button: false,
        navbar: true,
        title: false,
        toolbar: {
          prev: { show: true },
          zoomIn: { show: true },
          oneToOne: { show: true, size: 'large' },
          zoomOut: { show: true },
          next: { show: true }
        },
        tooltip: true,
        movable: true,
        zoomable: true,
        rotatable: false,
        scalable: false,
        transition: true,
        fullscreen: false,
        keyboard: false,
        url: 'originalURL'
      }
    }
  },
  async asyncData({ $axios, route, error }) {
    const albumId = route.params.album_id
    if (albumId) {
      return $axios
        .$get(`/api/v1/album/${albumId}`)
        .then(album => {
          return { album }
        })
        .catch(e => {
          const statusCode = (e.response && e.response.status) || 500
          error({ statusCode })
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
    },
    inited(viewer) {
      // Escute o evento 'view' no elemento criado pelo componente para determinar qual foto está sendo vista
      this.viewer = viewer
      this.viewer.element.addEventListener('view', ({ detail }) => {
        this.selectedPhotoIndex = detail.index
      })
    },
    navigatePrev() {
      this.viewer.prev()
    },
    navigateNext() {
      this.viewer.next()
    },
    getMediaURL(photoPath) {
      return getMediaUrl(photoPath)
    }
  }
}
</script>

<style>
.viewer-canvas {
  background: #e3e1e1;
}
.viewer-navbar {
  background: transparent;
}
</style>


<style lang="stylus" scoped>
.AlbumPage {
  display: flex;
  flex-direction: column;
  min-height: 90vh;
}

.AlbumPage, main {
  flex-grow: 1;
}

.AlbumInfo {
  max-width: $max-width;
  margin: 0 auto;
  width: 100%;
}
</style>
