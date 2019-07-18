<template>
  <div v-viewer="viewerOptions" class="images">
    <img class="OriginalImage" :originalURL="image" :src="image" />
  </div>
</template>

<script>
import { getMediaUrl } from '@/utils'
export default {
  name: 'NewDocumentPreview',
  props: {
    document: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    validSizes() {
      return this.document.thumbnails &&
        Object.keys(this.document.thumbnails).length > 0
        ? Object.keys(this.document.thumbnails)
            .filter(size => !isNaN(parseInt(size, 10)))
            .map(size => parseInt(size, 10))
        : []
    },
    image() {
      if (this.validSizes.length) {
        return getMediaUrl(
          this.document.thumbnails[Math.max(...this.validSizes)]
        )
      }
      return ''
    },
    viewerOptions() {
      return {
        inline: true,
        button: true,
        navbar: false,
        title: false,
        toolbar: {
          zoomIn: { show: true },
          oneToOne: { show: true, size: 'large' },
          zoomOut: { show: true }
        }
      }
    }
  }
}
</script>

<style>
.viewer-canvas {
  background: transparent;
}
</style>

<style lang="stylus" scoped>
.OriginalImage {
  display: none;
}
</style>
