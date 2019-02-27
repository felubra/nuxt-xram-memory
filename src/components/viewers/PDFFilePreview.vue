<template>
  <div class="PDFFilePreview">
    <div class="PDFFilePreview__Preview">
      <no-ssr>
        <pdf src="/melancoliallull.pdf" :page="1" scale="page-width">
          <template slot="loading">Carregando...</template>
        </pdf>
      </no-ssr>
    </div>
    <div class="PDFFilePreview__Actions PDFFilePreview__Actions--toolbar">
      <a :href="file_url" download class="PDFFilePreview__Action PDFFilePreview__Action--toolbar">
        <i class="material-icons">info</i>Mais informações
      </a>
      <a :href="file_url" download class="PDFFilePreview__Action PDFFilePreview__Action--toolbar">
        <i class="material-icons">get_app</i> Baixar
      </a>
      <!-- TODO: compartilhar
      <a :href="file_url" download class="PDFFilePreview__Action PDFFilePreview__Action--toolbar">
        <i class="material-icons">share</i> Compartilhar
      </a>
      -->
    </div>
    <div class="PDFFilePreview__Footer">
      <div class="PDFFilePreview__DocumentInfo">
        <p class="PDFFilePreview__Label microtext">Arquivo</p>
        <h1 class="PDFFilePreview__Title">{{title}}</h1>
        <p class="PDFFilePreview__Description">{{description}}</p>
        <p class="PDFFilePreview__Size">{{size}}</p>
        <p class="PDFFilePreview__SendDate">{{sendDate}}</p>
      </div>
      <div class="PDFFilePreview__Actions PDFFilePreview__Actions--stacked">
        <a :href="file_url" download class="PDFFilePreview__Action PDFFilePreview__Action--stacked">
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
  extends: DocumentPreview
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

.PDFFilePreview__Preview {
  flex-grow: 1;
  color: #333;
  text-align: center;
  overflow: hidden;
}

.PDFFilePreview__Message {
  color: inherit;
  margin: 1rem;
}

.PDFFilePreview__Footer {
  background: #a8a8a8;
  color: #fefefe;
  padding: 0.5rem;
  font-family: 'Cabin', sans-serif;
  display: flex;
}

.PDFFilePreview__Label {
  color: inherit;
  font-size: 0.75rem;
  margin-top: 0;
}
.PDFFilePreview__Title {
  margin: 0;
  font-weight: normal;
}
.PDFFilePreview__Description {
  margin: 0;
  font-size: 1rem;
}

.PDFFilePreview__DocumentInfo {
  flex-grow: 2;
}
.PDFFilePreview__Actions {
  flex-basis: 1.5rem;
  text-align: right;
  font-size: 1.75rem;
  font-family: 'Cabin', serif;
}
.PDFFilePreview__Actions--big {
  text-align: center;
}

.PDFFilePreview__Actions--big i {
  font-size: 3.5rem;
}

.PDFFilePreview__Action {
  color: inherit;
  display: inline-block;
}

.PDFFilePreview__Action--stacked {
  display: block;
}

.PDFFilePreview__Actions--toolbar {
  display: flex;
  flex-basis: 2rem;
  justify-content: space-between;
  align-items: center;
  background: #eeeeee;
  color: #333;
  padding: 1rem 0.5rem;
}

.PDFFilePreview__Actions--dark {
  background: #333;
  color: #eeeeee;
}

.PDFFilePreview__Action--toolbar {
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  text-transform: uppercase;
}

.PDFFilePreview__Action--toolbar > i {
  padding-right: 0.2rem;
}

.PDFFilePreview__Size,
.PDFFilePreview__SendDate {
  display: inline-block;
  font-size: 0.75rem;
  margin-right: 1rem;
  margin-bottom: 0;
}
</style>
