<template>
  <AbstractPage class="Page Page--bare">
    <no-ssr>
      <component :is="previewComponentType" :doc-item="document"></component>
    </no-ssr>
  </AbstractPage>
</template>
<script>
import UnknownFilePreview from '~/components/viewers/UnknownFilePreview'
import AbstractPage from '~/components/common/AbstractPage'
export default {
  components: {
    UnknownFilePreview,
    PDFFilePreview: () => {
      if (typeof window !== 'undefined') {
        return import(/* webpackChunkName: "PDFFilePreview" */ '~/components/viewers/PDFFilePreview')
      }
      return {} // não carregue este componente server-side
    },
    ImageFilePreview: () =>
      import(/* webpackChunkName: "ImageFilePreview" */ '~/components/viewers/ImageFilePreview')
  },
  data() {
    return { document: {} }
  },
  head() {
    return {
      title: this.document.name,
      titleTemplate: 'xraM-Memory - Documento: %s'
    }
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
