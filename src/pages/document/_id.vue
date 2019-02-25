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
      return parseInt(this.$route.params.id) || null
    },
    documents() {
      return [
        {
          id: 1,
          title: 'Ejud.zip',
          teaser: 'Arquivos do processo de Lula',
          file_size: 5 * 1000 * 1000,
          url: '/media/abacate.txt',
          createdAt: '2008-09-15T15:53:00+05:00',
          modifiedAt: '2008-09-15T15:53:00+05:00'
        },
        {
          id: 2,
          title: 'Filomena.jpeg',
          teaser: 'Um texto muito bonito',
          mime_type: 'image/jpg',
          file_size: 5 * 666 * 1000,
          url:
            '/media/artifacts/documents/image_files/_2019-01-29_14.28.51.0854001546379483822.jpg',
          createdAt: '2008-09-15T15:53:00+05:00',
          modifiedAt: '2008-09-15T15:53:00+05:00'
        }
      ]
    },
    document() {
      return this.documents.find(document => document.id === this.documentId)
    },
    previewComponentType() {
      try {
        if (this.document.mime_type) {
          if (this.document.mime_type === 'application/pdf') {
            return 'PDFFilePreview'
          } else if (this.document.mime_type.includes('image/')) {
            return 'ImageFilePreview'
          } else {
            return 'UnknownFilePreview'
          }
        }
      } catch {
        return 'UnknownFilePreview'
      }
      return 'UnknownFilePreview'
    },
    isUnknown() {
      return this.previewComponentType === 'UnknownFilePreview'
    }
  }
}
</script>
