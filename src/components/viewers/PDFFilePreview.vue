<template>
  <div class="PDFFilePreview">
    <div class="FilePreview__Preview FilePreview__Preview--pdf_file">
      <no-ssr>
        <pdf :src="file_url" :page="1" scale="page-width">
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
  mounted() {
    this.a = 1
  }
}
</script>

<style scoped>
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
</style>
