<template>
  <div class="ImageFilePreview">
    <img :src="file_url" :alt="title" :title="title" />
  </div>
</template>

<script>
import DocumentPreview from './DocumentPreview'
export default {
  name: 'ImageFilePreview',
  extends: DocumentPreview
}
</script>

<style scoped>
</style>
