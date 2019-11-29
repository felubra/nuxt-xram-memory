<template>
  <div class="FilePreview ImageFilePreview">
    <viewer :options="viewerOptions" :images="[fileURL]">
      <template v-slot:default="scope">
        <figure class="images">
          <div v-for="image in scope.images" :key="image" class="image-wrapper">
            <img class="ImageFilePreview__OriginalImage" :src="image" />
          </div>
        </figure>
      </template>
    </viewer>
  </div>
</template>

<script>
import DocumentPreview from './DocumentPreview'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Vue from 'vue'
Vue.use(Viewer)

export default {
  name: 'ImageFilePreview',
  extends: DocumentPreview,
  computed: {
    viewerOptions() {
      return {
        inline: true,
        button: false,
        navbar: false,
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
        keyboard: false
      }
    }
  }
}
</script>

<style lang="stylus">
.ImageFilePreview__OriginalImage {
  display: none;
}

.ImageFilePreview {
  background: transparent;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
}

@media only screen and (min-width: 768px) {
  .ImageFilePreview {
    flex: 1;
    display: block;
  }
}
</style>
