<template>
  <AbstractPage class="Page--sidebar Page--aside-after">
    <template v-slot:aside>
      <div class="PageAside AlbumInfo">
        <div class="FileActions">
          <a class="FileInfo_Button microtext" download :href="fileURL">
            <i class="material-icons">get_app</i> Baixar
          </a>
        </div>
        <p>{{fileName}}</p>
        <p class="FileInfo__Description">{{fileDescription}}</p>
        <dl>
          <div v-if="fileSize">
            <dt class="microtext">Tamanho</dt>
            <dd>{{fileSize}}</dd>
          </div>
        </dl>
      </div>
    </template>
    <a :class="{disabled: !hasPrev}" class="PhotoBrowser" @click.prevent="navigatePrev">
      <i class="material-icons">keyboard_arrow_left</i>
    </a>
    <a
      :class="{disabled: !hasNext}"
      class="PhotoBrowser PhotoBrowser--right"
      @click.prevent="navigateNext"
    >
      <i class="material-icons">keyboard_arrow_right</i>
    </a>
    <viewer class="Album__Viewer" :options="viewerOptions" :images="photos" @inited="inited">
      <template slot-scope="scope">
        <img
          v-for="image in scope.images"
          :key="image.id"
          class="ImageFilePreview__OriginalImage"
          :src="getMediaURL(image.thumbnail)"
          :originalURL="getMediaURL(image.canonical_url)"
        >
      </template>
    </viewer>
    <no-ssr>
      <resize-sensor @resize="selectImageSize"></resize-sensor>
    </no-ssr>
  </AbstractPage>
</template>
<script>
import AbstractPage from '~/components/common/AbstractPage'
const humanSize = require('human-size')

const { getMediaUrl } = require('~/utils')
export default {
  components: {
    AbstractPage
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
      return this.getMediaURL(this.selectedPhoto.thumbnails[selectedImageSize])
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
          zoomIn: { show: true },
          oneToOne: { show: true, size: 'large' },
          zoomOut: { show: true }
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


<style scoped>
.Album__Viewer {
  /** Este elemento não precisa ficar visível, pois conterá apenas as imagens */
  display: none;
}

a.PhotoBrowser {
  position: fixed;
  height: 100vh;
  width: 56px;
  display: flex;
  z-index: 999;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  text-align: center;
  color: #333;
  text-decoration: none;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.25s ease;
}

a.PhotoBrowser > i {
  font-size: 36px;
}

a.PhotoBrowser:hover,
a.PhotoBrowser:active,
a.PhotoBrowser:focus {
  color: inherit;
  text-decoration: none;
}

a.PhotoBrowser.PhotoBrowser--right {
  right: 0;
}

main:hover a.PhotoBrowser {
  opacity: 1;
}

main:hover a.PhotoBrowser.disabled {
  opacity: 0.3;
}

h1 {
  font-weight: normal;
  font-size: 1rem;
  word-break: break-all;
  margin: 0;
}

.Album__Grid {
  overflow-y: auto;
}

.Album__Grid img {
  width: 65px;
}

.AlbumInfo {
  max-height: 100vh;
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
