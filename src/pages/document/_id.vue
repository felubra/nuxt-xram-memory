<template>
  <section class="page-container">
    <component :is="previewComponentType" :doc-item="document"></component>
    <div v-if="!isUnknown" class="Document__Actions"></div>
    <div class="Document__Info"></div>
  </section>
</template>
<script>
export default {
  components: {
    UnknownFilePreview: () => import('~/components/UnknownFilePreview'),
    PDFFilePreview: () => import('~/components/PDFFilePreview'),
    ImageFilePreview: () => import('~/components/ImageFilePreview')
  },
  computed: {
    documentId() {
      return this.$route.params.id || null
    },
    document() {
      return {
        title: 'IMG_1054.jpeg',
        teaser: 'Lula sendo preso',
        file_size: 5 * 1000 * 1000,
        url: '/media/abacate.txt'
      }
    },
    previewComponentType() {
      if (this.document.mime_type) {
        if (this.document.mime_type === 'application/pdf') {
          return 'PDFFilePreview'
        } else if (this.document.mime_type.contains('image/')) {
          return 'ImageFilePreview'
        } else {
          return 'UnknownFilePreview'
        }
      }
      return 'UnknownFilePreview'
    },
    isUnknown() {
      return this.previewComponentType === 'UnknownFilePreview'
    }
  }
}
</script>
