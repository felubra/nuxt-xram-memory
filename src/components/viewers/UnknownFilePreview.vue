<template>
  <div class="FilePreview UnknownFilePreview">
    <div class="FilePreview__Preview FilePreview__Preview--unknown">
      <p class="FilePreview__Message microtext">Visualização não disponível.</p>
      <div class="FilePreview__Actions FilePreview__Actions--big">
        <a :href="fileURL" class="FilePreview__Action">
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
.FilePreview__Preview--unknown {
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
}

@media only screen and (min-width: 768px) {
  .UnknownFilePreview {
    flex: 1;
    display: block;
  }
  .FilePreview__Preview--unknown {
    padding-top: 0;
    min-height: 100vh;
  }
}
</style>
