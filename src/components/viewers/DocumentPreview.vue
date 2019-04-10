<script>
export default {
  name: 'DocumentPreview',
  props: {
    fileURL: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
.FilePreview {
  height: 80vh;
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
