<template>
  <div class="ImageFilePreview">
    <div class="FilePreview__Preview">
      <viewer :options="viewerOptions" :images="[file_url]">
        <template slot-scope="scope">
          <figure class="images">
            <div v-for="image in scope.images" :key="image" class="image-wrapper">
              <img
                :title="description"
                :alt="description"
                class="ImageFilePreview__OriginalImage"
                :src="image"
              >
            </div>
          </figure>
        </template>
      </viewer>
    </div>
    <div class="FilePreview__Footer FilePreview__Footer--blue">
      <div class="FilePreview__DocumentInfo">
        <p class="FilePreview__Label microtext">Imagem</p>
        <h1 class="FilePreview__Title">{{title}}</h1>
        <p class="FilePreview__Description">{{description}}</p>
        <p class="FilePreview__Size">{{size}}</p>
        <p class="FilePreview__SendDate">{{sendDate}}</p>
      </div>
      <div class="FilePreview__Actions FilePreview__Actions">
        <a :href="file_url" download class="FilePreview__Action FilePreview__Action--stacked">
          <i class="material-icons">get_app</i>
        </a>
        <!-- TODO: compartilhar... -->
      </div>
    </div>
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

<style scoped>
.ImageFilePreview__OriginalImage {
  display: none;
}

.ImageFilePreview {
  background: #fefefe;
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
