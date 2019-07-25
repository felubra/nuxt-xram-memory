<template>
  <section class="AlbumPage">
    <main>
      <viewer
        v-show="visible"
        ref="viewer"
        class="Album__Viewer"
        :options="viewerOptions"
        :images="photos"
        @inited="inited"
      >
        <template slot-scope="scope">
          <img
            v-for="image in scope.images"
            :key="image.document_id"
            class="hidden"
            :src="getMediaURL(image.thumbnails.thumbnail)"
            :originalURL="getMediaURL(image.canonical_url)"
            :ready="viewerReady"
          />
        </template>
      </viewer>
      <no-ssr>
        <resize-sensor @resize="selectImageSize"></resize-sensor>
      </no-ssr>
    </main>
  </section>
</template>
<script>
const humanSize = require('human-size')
const { getMediaUrl } = require('~/utils')
export default {
  data() {
    return {
      album: {},
      selectedPhotoIndex: 0,
      selectedImageSize: null,
      visible: false,
      isServer: true
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
        navbar: true,
        toolbar: {
          zoomIn: { show: true },
          zoomOut: { show: true },
          prev: { show: true },
          oneToOne: { show: true, size: 'large' },
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
        url: 'originalURL',
        buttom: true,
        loading: true,
        title: this.imageTitle,
        ready: this.viewerReady
      }
    }
  },
  async asyncData({ $axios, route, error, isServer }) {
    const albumId = route.params.album_id
    if (albumId) {
      return $axios
        .$get(`/api/v1/album/${albumId}`)
        .then(album => {
          return { album, isServer }
        })
        .catch(e => {
          const statusCode = (e.response && e.response.status) || 500
          error({ statusCode })
        })
    } else {
      error({ statusCode: 404, message: 'Álbum não encontrado' })
    }
  },
  mounted() {
    if (!this.isServer) {
      window.addEventListener(
        'orientationchange',
        this.orientationChange,
        false
      )
    }
  },
  beforeDestroy() {
    if (!this.isServer) {
      window.removeEventListener(
        'orientationchange',
        this.orientationChange,
        false
      )
    }
  },

  methods: {
    orientationChange(e) {
      const { $viewer } = this.$refs.viewer
      if (Math.abs(window.orientation) === 90) {
        $viewer.full()
      } else {
        $viewer.exit()
      }
    },
    imageTitle() {
      return this.selectedPhoto.description
    },
    selectImageSize({ width, height }) {
      const largestSide = Math.max(width, height)
      const candidateSizes = this.availableSizes.filter(
        availableSize => largestSide >= availableSize
      )
      this.selectedImageSize = candidateSizes.length
        ? Math.max(...candidateSizes)
        : this.failbackSize
    },
    viewerReady() {
      this.visible = true
      this.orientationChange()
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
  },
  beforeRouteLeave(to, from, next) {
    this.visible = false
    this.$nextTick(() => {
      next()
    })
  }
}
</script>

<style>
.viewer-navbar {
  background: transparent;
}

.viewer-title {
  color: #000;
  font-family: 'Cabin', sans-serif;
  font-size: 16px;
  text-shadow: 0px 0px 5px #dfdfdf;
}

.viewer-fixed .viewer-title {
  color: #efefef;
  text-shadow: 0px 0px 5px #000;
}
</style>


<style lang="stylus" scoped>
.AlbumPage {
  display: flex;
  flex-direction: column;
  position: relative;
}

aside {
  flex-basis: 85px;
}

.Thumbnails {
  display: flex;
}

.Thumbnails > img {
  height: 75px;
  padding: 5px;
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
