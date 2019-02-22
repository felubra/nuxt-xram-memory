<template>
  <div class="UnknownFilePreview">
    <p class="microtext">Visualização não disponível.</p>
    <div class="UnknownFilePreview__Actions">
      <a :href="file_url" class="UnknownFilePreview__Action">
        <i class="material-icons">download</i> Baixar
      </a>
      <!-- TODO: compartilhar... -->
    </div>
  </div>
</template>

<script>
import DocumentPreview from './DocumentPreview'
export default {
  name: 'UnknownFilePreview',
  extends: DocumentPreview
}
</script>

<style scoped>
.UnknownFilePreview {
  background: #ccc;
  flex: 1;
}
</style>
