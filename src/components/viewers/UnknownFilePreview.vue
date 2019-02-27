<template>
  <div class="UnknownFilePreview">
    <div class="FilePreview__Preview FilePreview__Preview--unknown">
      <p class="FilePreview__Message microtext">Visualização não disponível.</p>
      <div class="FilePreview__Actions FilePreview__Actions--big">
        <a :href="file_url" class="FilePreview__Action">
          <i class="material-icons">get_app</i>
        </a>
        <!-- TODO: compartilhar... -->
      </div>
    </div>
    <div class="FilePreview__Footer">
      <div class="FilePreview__DocumentInfo">
        <p class="FilePreview__Label microtext">Arquivo</p>
        <h1 class="FilePreview__Title">{{title}}</h1>
        <p class="FilePreview__Description">{{description}}</p>
        <p class="FilePreview__Size">{{size}}</p>
        <p class="FilePreview__SendDate">{{sendDate}}</p>
      </div>
      <div class="FilePreview__Actions FilePreview__Actions">
        <a :href="file_url" class="FilePreview__Action FilePreview__Action--stacked">
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
  name: 'UnknownFilePreview',
  extends: DocumentPreview
}
</script>

<style scoped>
.UnknownFilePreview {
  background: #fefefe;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.FilePreview__Preview--unknown {
  padding-top: 50%;
}
</style>
