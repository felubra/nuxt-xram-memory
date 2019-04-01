<template>
  <div class="PDFFilePreview">
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
            <a :href="file_url" class="FilePreview__Action">
              <i class="material-icons">get_app</i>
            </a>
            <!-- TODO: compartilhar... -->
          </div>
        </template>
      </pdf>
    </div>
    <div class="FilePreview__Actions FilePreview__Actions--toolbar">
      <a href="#document-info" class="FilePreview__Action FilePreview__Action--toolbar">
        <i class="material-icons">info</i>Mais informações
      </a>
      <ul class="PDFFilePreview__PageControls PDFFilePreview__PageControls--toolbar">
        <!--
          <li>
            <a href="#" title="Tela Inteira" @click.prevent="fullScreen">
              <i class="material-icons">fullscreen</i>
            </a>
        </li>-->
      </ul>
      <a :href="file_url" download class="FilePreview__Action FilePreview__Action--toolbar">
        <i class="material-icons">get_app</i> Baixar
      </a>
      <!-- TODO: compartilhar
      <a :href="file_url" download class="FilePreview__Action FilePreview__Action--toolbar">
        <i class="material-icons">share</i> Compartilhar
      </a>
      -->
    </div>
    <div class="FilePreview__Footer FilePreview__Footer--blue FilePreview__Footer--pdf-file">
      <div id="document-info" class="FilePreview__DocumentInfo">
        <p class="FilePreview__Label microtext">Documento</p>
        <h1 class="FilePreview__Title">{{title}}</h1>
        <p class="FilePreview__Description">{{description}}</p>
        <p class="FilePreview__Size">{{size}}</p>
        <p class="FilePreview__SendDate">{{sendDate}}</p>
      </div>
      <div class="FilePreview__Actions FilePreview__Actions--stacked">
        <a :href="file_url" class="FilePreview__Action FilePreview__Action--stacked" download>
          <i class="material-icons">get_app</i>
        </a>
        <!-- TODO: compartilhar... -->
      </div>
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
      return pdf.createLoadingTask(this.file_url)
    }
  }
}
</script>

<style>
.PDFFilePreview__OriginalImage {
  display: none;
}

.PDFFilePreview {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.FilePreview__Preview--pdf_file {
  height: 75vh;
  overflow: hidden;
  overflow-y: scroll;
  cursor: grab;
}

.FilePreview__Preview--pdf_file:active {
  cursor: grabbing;
}

.PDFFilePreview__PDFComponent {
  position: relative;
  display: inline-block;
  padding: 0.5rem;
}

.PDFFilePreview__PDFComponent:first-of-type {
  padding-top: 3.098rem;
}

.PDFFilePreview__PDFComponent:last-of-type {
  padding-bottom: 1rem;
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

@media only screen and (min-width: 768px) {
  .PDFFilePreview {
    flex-direction: row;
  }

  .FilePreview__Preview--pdf_file {
    overflow-x: hidden;
    height: auto;
    min-height: 75vh;
    max-height: 100vh;
    background: #e3e1e1;
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
