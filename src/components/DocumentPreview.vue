<script>
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
      return this.docItem.url
    },
    title() {
      return this.docItem.title
    }
  }
}
</script>
