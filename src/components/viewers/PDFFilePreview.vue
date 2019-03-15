<template>
  <div class="PDFFilePreview">
    <div class="FilePreview__Preview FilePreview__Preview--pdf_file">
      <no-ssr>
        <pdf class="PDFFilePreview__PDFComponent" :src="file_url" :page="1" :scale="scale">
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
      </no-ssr>
    </div>
    <div class="FilePreview__Actions FilePreview__Actions--toolbar">
      <a href="#document-info" class="FilePreview__Action FilePreview__Action--toolbar">
        <i class="material-icons">info</i>Mais informações
      </a>
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
export default {
  name: 'PDFFilePreview',
  components: {
    pdf: () => {
      /** Não carregue este componente a menos que estejamos no browser, pois o remédio <no-ssr>
       acima é suficiente */
      if (typeof window !== 'undefined') {
        return import(/* webpackChunkName: "pdfVuer" */ 'pdfvuer')
      }
      return {}
    }
  },
  extends: DocumentPreview,
  computed: {
    scale() {
      try {
        return window.innerWidth < 768 ? 'page-width' : 'page-height'
      } catch {
        return 'page-width'
      }
    }
  },
  mounted() {
    this.a = 1
  }
}
</script>

<style>
.PDFFilePreview__OriginalImage {
  display: none;
}

.PDFFilePreview {
  background: #fefefe;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.FilePreview__Preview--pdf_file {
  height: 75vh;
  overflow: hidden;
  overflow-y: scroll;
}

.FilePreview__Footer--pdf-file {
  flex-grow: 1;
}

@media only screen and (min-width: 768px) {
  .PDFFilePreview {
    background: #fefefe;
    display: block;
  }

  .PDFFilePreview__PDFComponent .page {
    margin: 0 auto;
  }
  .FilePreview__Preview--pdf_file {
    overflow: visible;
    min-height: calc(75vh + 2rem);
    background: #f3f1f1;
  }
  .FilePreview__Footer--pdf-file {
    background: transparent;
  }
  #viewerContainer {
    height: 75vh;
    padding: 1rem;
  }
  #viewerContainer canvas {
    border: solid 1px #ccc;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
}
</style>
