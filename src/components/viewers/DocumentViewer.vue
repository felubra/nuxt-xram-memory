<template>
  <div class="DocumentViewer">
    <viewer
      v-show="visible"
      :images="images"
      :options="getViewerOptions()"
      @inited="onViewerStarted"
    >
      <template v-slot:default="{ images }">
        <img
          v-for="image in images"
          :key="image.src"
          :alt="image.description"
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
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Vue from 'vue'
Vue.use(Viewer)

export default {
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
  data() {
    return {
      visible: false
    }
  },
  beforeDestroy() {
    if (this.viewer) {
      this.viewer.destroy()
    }
  },
  methods: {
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
        title: image => (this.showTitle ? image.alt : '')
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
