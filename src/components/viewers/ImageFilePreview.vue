<template>
  <div class="ImageFilePreview">
    <viewer :options="viewerOptions" :images="[fileURL]">
      <template slot-scope="scope">
        <figure class="images">
          <div v-for="image in scope.images" :key="image" class="image-wrapper">
            <img class="ImageFilePreview__OriginalImage" :src="image">
          </div>
        </figure>
      </template>
    </viewer>
  </div>
</template>

<script>
import DocumentPreview from './DocumentPreview'
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

<style>
.ImageFilePreview__OriginalImage {
  display: none;
}

.ImageFilePreview {
  background: #e3e1e1;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.ImageFilePreview .viewer-canvas {
  background: #e3e1e1;
}

.FilePreview__Preview {
  min-height: 75vh;
}
@media only screen and (min-width: 768px) {
  .ImageFilePreview {
    flex: 1;
    display: block;
  }
}
</style>
