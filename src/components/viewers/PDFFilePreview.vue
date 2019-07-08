<template>
  <div
    v-if="preview && previewURL"
    class="FilePreview PDFFilePreview PDFFilePreview--image_preview"
  >
    <img :src="previewURL" />
  </div>
  <div v-else class="FilePreview PDFFilePreview">
    <div
      ref="pdfContainer"
      v-dragscroll.y="true"
      class="FilePreview__Preview FilePreview__Preview--pdf_file"
    >
      <pdf
        v-for="i in numPages"
        :key="i"
        ref="pdfComponent"
        class="PDFFilePreview__PDFComponent"
        :src="loadingTask()"
        style="width: calc(100% - 1rem);"
        :page="i"
      >
        <template slot="loading">
          <p class="FilePreview__Message microtext">Carregando...</p>
          <div class="FilePreview__Actions FilePreview__Actions--big">
            <a :href="fileURL" class="FilePreview__Action">
              <i class="material-icons">get_app</i>
            </a>
            <!-- TODO: compartilhar... -->
          </div>
        </template>
      </pdf>
    </div>
  </div>
</template>

<script>
import DocumentPreview from './DocumentPreview'
import { dragscroll } from 'vue-dragscroll'
import pdf from 'vue-pdf'
export default {
  name: 'PDFFilePreview',
  components: {
    pdf: pdf
  },
  directives: {
    dragscroll
  },
  extends: DocumentPreview,
  props: {
    preview: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      numPages: 0
    }
  },
  mounted() {
    this.loadingTask().then(pdf => {
      this.numPages = pdf.numPages
    })
  },
  methods: {
    fullScreen() {
      /** TODO: */
    },
    loadingTask() {
      return pdf.createLoadingTask(this.fileURL)
    }
  }
}
</script>

<style>
.FilePreview__Preview--pdf_file {
  height: 80vh;
  overflow: hidden;
  overflow-y: scroll;
  cursor: grab;
  background: #e3e1e1;
}

.FilePreview__Preview--pdf_file:active {
  cursor: grabbing;
}

.PDFFilePreview__PDFComponent {
  position: relative;
  display: inline-block;
  padding: 0.5rem;
}

.FilePreview__Footer--pdf-file {
  flex-grow: 1;
}

.PDFFilePreview__PageControls {
  display: block;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.PDFFilePreview__PageControls > li {
  display: inline;
}

.PDFFilePreview__PageControls a {
  color: #333;
}

.PDFFilePreview__PageControls {
  display: none;
}

.PDFFilePreview__PageControls--toolbar {
  display: block;
}

.PDFFilePreview__PDFComponent > canvas {
  border: solid 1px #ccc;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
}

.PDFFilePreview--image_preview {
  display: block;
  height: auto;
  height: auto;
  margin: 0 auto;
  text-align: center;
}

.PDFFilePreview--image_preview img {
  height: 75vh;
  padding: 1rem;
  background: #fff;
  box-shadow: 1px 1px 10px #ccc;
}

@media only screen and (min-width: 768px) {
  .PDFFilePreview {
    flex-direction: row;
  }

  .FilePreview__Preview--pdf_file {
    overflow-x: hidden;
    height: auto;
    min-height: 75vh;
    max-height: 100vh;
  }
  .FilePreview__Footer--pdf-file {
    background: transparent;
    flex-grow: 0;
    background: #f3f1f1;
  }

  .PDFFilePreview__PageControls {
    display: block;
  }
  .PDFFilePreview__PageControls--toolbar {
    display: none;
  }
}
</style>
