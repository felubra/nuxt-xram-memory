<template>
  <section class="Page Page--bare">
    <component :is="previewComponentType" :doc-item="document"></component>
  </section>
</template>
<script>
import UnknownFilePreview from '~/components/viewers/UnknownFilePreview'
export default {
  components: {
    UnknownFilePreview,
    PDFFilePreview: () =>
      import(/* webpackChunkName: "PDFFilePreview" */ '~/components/viewers/PDFFilePreview'),
    ImageFilePreview: () =>
      import(/* webpackChunkName: "ImageFilePreview" */ '~/components/viewers/ImageFilePreview')
  },
  data() {
    return { document: {} }
  },
  computed: {
    previewComponentType() {
      try {
        if (this.document && this.document.mime_type) {
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
  },
  async asyncData({ $axios, route }) {
    const documentId = parseInt(route.params.id) || null
    return $axios.$get(`/api/v1/document/${documentId}`).then(document => {
      return { document }
    })
  }
}
</script>
