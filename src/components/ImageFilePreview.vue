<template>
  <div class="ImageFilePreview">
    <div class="ImageFilePreview__Preview">
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
    <div class="ImageFilePreview__Footer">
      <div class="ImageFilePreview__DocumentInfo">
        <p class="ImageFilePreview__Label microtext">Arquivo</p>
        <h1 class="ImageFilePreview__Title">{{title}}</h1>
        <p class="ImageFilePreview__Description">{{description}}</p>
        <p class="ImageFilePreview__Size">{{size}}</p>
        <p class="ImageFilePreview__SendDate">{{sendDate}}</p>
      </div>
      <div class="ImageFilePreview__Actions ImageFilePreview__Actions">
        <a
          :href="file_url"
          download
          class="ImageFilePreview__Action ImageFilePreview__Action--stacked"
        >
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

.ImageFilePreview__Preview {
  flex-grow: 1;
  color: #333;
  text-align: center;
  overflow: hidden;
}

.ImageFilePreview__Message {
  color: inherit;
  margin: 1rem;
}

.ImageFilePreview__Footer {
  background: #a8a8a8;
  color: #fefefe;
  padding: 0.5rem;
  font-family: 'Cabin', sans-serif;
  display: flex;
}

.ImageFilePreview__Label {
  color: inherit;
  font-size: 0.75rem;
  margin-top: 0;
}
.ImageFilePreview__Title {
  margin: 0;
  font-weight: normal;
}
.ImageFilePreview__Description {
  margin: 0;
  font-size: 1rem;
}

.ImageFilePreview__DocumentInfo {
  flex-grow: 2;
}
.ImageFilePreview__Actions {
  flex-basis: 1.5rem;
  text-align: right;
  font-size: 1.5rem;
}
.ImageFilePreview__Actions--big {
  text-align: center;
}

.ImageFilePreview__Actions--big i {
  font-size: 3.5rem;
}

.ImageFilePreview__Action {
  color: inherit;
  display: inline-block;
}

.ImageFilePreview__Action--stacked {
  display: block;
}

.ImageFilePreview__Size,
.ImageFilePreview__SendDate {
  display: inline-block;
  font-size: 0.75rem;
  margin-right: 1rem;
  margin-bottom: 0;
}
</style>
