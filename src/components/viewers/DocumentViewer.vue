<template>
  <div class="DocumentViewer">
    <Viewer
      v-show="visible"
      :images="images"
      :options="getViewerOptions()"
      @inited="onViewerStarted"
    >
      <template>
        <img
          v-for="image in images"
          :key="image.src"
          :alt="image.description"
          class="hidden"
          :src="image.thumbnailSrc"
          :originalURL="image.src"
        >
      </template>
    </Viewer>
  </div>
</template>

<script>
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer/src/component.vue'

export default {
  name: 'DocumentViewer',
  components: {
    Viewer
  },
  props: {
    images: {
      type: Array,
      default: () => []
    },
    showTitle: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visible: false
    }
  },
  mounted () {
    window.addEventListener('orientationchange', this.orientationChange, false)
  },
  beforeDestroy () {
    window.removeEventListener(
      'orientationchange',
      this.orientationChange,
      false
    )
    if (this.viewer) {
      this.viewer.destroy()
    }
  },
  methods: {
    orientationChange () {
      if (this.viewer) {
        if (Math.abs(window.orientation) === 90) {
          this.viewer.full()
        } else {
          this.viewer.exit()
        }
      }
    },
    viewerReady () {
      this.visible = true
      this.orientationChange()
    },
    onViewerStarted (viewer) {
      this.viewer = viewer
    },
    getViewerOptions () {
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
        title: image => (this.showTitle ? image.alt : ''),
        ready: this.viewerReady
      }
    }
  }
}
</script>
<style>
.viewer-canvas.viewer-loading > img {
  display: none;
}
</style>

<style lang="stylus">
.DocumentViewer {
  flex: 1;
}
.viewer-navbar {
  background: transparent;
}

.viewer-title {
  color: #000;
  font-family: $sans-serif;
  font-size: 16px;
  text-shadow: 0px 0px 5px #dfdfdf;
}

.viewer-fixed .viewer-title {
  color: #efefef;
  text-shadow: 0px 0px 5px #000;
}

.viewer-backdrop {
  background-color: #e6e6e6;
}
</style>
