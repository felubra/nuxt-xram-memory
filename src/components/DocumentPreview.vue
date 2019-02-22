<script>
const humanSize = require('human-size')
const dayJs = require('dayjs')
export default {
  name: 'DocumentPreview',
  props: {
    docItem: {
      type: Object,
      required: true
    }
  },
  computed: {
    file_url() {
      /** TODO: adicionar prefixo */
      return this.docItem.url
    },
    title() {
      /** TODO: sanitizar */
      return this.docItem.title
    },
    description() {
      /** TODO: sanitizar */
      return this.docItem.teaser
    },
    size() {
      try {
        return humanSize(this.docItem.file_size)
      } catch {
        return '0KB'
      }
    },
    sendDate() {
      try {
        const dateTime = dayJs(this.docItem.modified_at)
        if (!dateTime.isValid()) {
          throw new Error()
        }
        const localDateTime = dateTime.toDate().toLocaleDateString()
        return `Enviado em ${localDateTime}`
      } catch {
        return ''
      }
    }
  }
}
</script>
