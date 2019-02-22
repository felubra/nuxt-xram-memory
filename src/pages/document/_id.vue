<template>
  <section class="page-container">
    <component :is="previewComponentType" :doc-item="document"></component>
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
        title: 'Ejud.zip',
        teaser: 'Arquivos do processo de Lula',
        file_size: 5 * 1000 * 1000,
        url: '/media/abacate.txt',
        createdAt: '2008-09-15T15:53:00+05:00',
        modifiedAt: '2008-09-15T15:53:00+05:00'
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
