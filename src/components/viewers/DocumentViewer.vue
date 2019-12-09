<template>
  <div class="DocumentViewer">
    <viewer
      v-show="visible"
      :images="documentImages"
      :options="getViewerOptions()"
      @inited="onViewerStarted"
    >
      <template v-slot:default="{ images }">
        <img
          v-for="image in images"
          :key="image.src"
          class="hidden"
          :src="image.thumbnailSrc"
          :originalURL="image.src"
          @load="viewerReady"
        />
      </template>
    </viewer>
  </div>
</template>

<script>
import { getMediaUrl } from '@/utils'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Vue from 'vue'
import { resetLoadingConfig, setContinuousLoading } from '~/utils'

Vue.use(Viewer)

export default {
  props: {
    document: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      visible: false
    }
  },
  computed: {
    documentIsPDF() {
      return this.document.mime_type === 'application/pdf'
    },
    documentImages() {
      if (this.documentIsPDF) {
        try {
          return this.document.pages.map(page => {
            return {
              src: getMediaUrl(page.canonical_url),
              thumbnailSrc: getMediaUrl(page.thumbnails.document_thumbnail)
            }
          })
        } catch {
          return []
        }
      }
      return [
        {
          src: this.document.canonical_url,
          thumbnailSrc: this.document.thumbnails.thumbnail
        }
      ]
    }
  },
  created() {
    if (this.documentIsPDF) {
      this.fetchDocumentPages()
    }
  },
  methods: {
    async fetchDocumentPages() {
      const oldConfig = {
        continuous: this.$nuxt.$loading.continuous,
        duration: this.$nuxt.$loading.duration
      }

      try {
        setContinuousLoading(this.$nuxt.$loading)
        this.$nuxt.$loading.start()
        const { pages } = await this.$axios.$get(
          `/api/v1/document/${this.document.document_id}/pages`
        )
        this.$set(this.document, 'pages', pages)
      } finally {
        this.$nuxt.$loading.finish()
        resetLoadingConfig(this.$nuxt.$loading, oldConfig)
      }
    },
    viewerReady() {
      this.visible = true
    },
    onViewerStarted(viewer) {
      this.viewer = viewer
    },
    getViewerOptions() {
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
        title: () => this.document.description
        //ready: this.viewerReady
      }
    }
  }
}
</script>

<style>
.DocumentViewer {
  flex: 1;
}
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

<style lang="stylus">
.viewer-backdrop {
  background-color: #e6e6e6;
}
</style>
