<script>
import Microtext from '@/components/common/Microtext'
export default {
  name: 'DocumentPreview',
  components: {
    Microtext
  },
  props: {
    fileURL: {
      type: String,
      required: true
    },
    previewURL: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus">
.FilePreview {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.FilePreview__Preview {
  flex-grow: 1;
  color: #333;
  background: #e3e1e1;
  height: 100vh;
  text-align: center;
  overflow: hidden;
}

.FilePreview__Actions {
  flex-basis: 1.5rem;
  text-align: right;
  font-size: 1.5rem;
}
</style>
