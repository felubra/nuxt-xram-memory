<script>
const humanSize = require('human-size')
const dayJs = require('dayjs')
const { getMediaUrl } = require('~/utils')
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
      return getMediaUrl(this.docItem.file)
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

<style>
.FilePreview__Preview {
  flex-grow: 1;
  color: #333;
  text-align: center;
  overflow: hidden;
}

.FilePreview__Footer {
  background: #a8a8a8;
  color: #fefefe;
  padding: 0.5rem;
  font-family: 'Cabin', sans-serif;
  display: flex;
}

.FilePreview__Label {
  color: inherit;
  font-size: 0.75rem;
  margin-top: 0;
}
.FilePreview__Title {
  margin: 0;
  font-weight: normal;
}
.FilePreview__Description {
  margin: 0;
  font-size: 1rem;
}

.FilePreview__DocumentInfo {
  flex-grow: 2;
}
.FilePreview__Actions {
  flex-basis: 1.5rem;
  text-align: right;
  font-size: 1.5rem;
}
.FilePreview__Actions--big {
  text-align: center;
}

.FilePreview__Actions--big i {
  font-size: 3.5rem;
}

.FilePreview__Action {
  color: inherit;
  display: inline-block;
}

.FilePreview__Action--stacked {
  display: block;
}

.FilePreview__Size,
.FilePreview__SendDate {
  display: inline-block;
  font-size: 0.75rem;
  margin-right: 1rem;
  margin-bottom: 0;
}
.FilePreview__Actions--toolbar {
  display: flex;
  flex-basis: 2rem;
  justify-content: space-between;
  align-items: center;
  background: #eeeeee;
  color: #333;
  padding: 1rem 0.5rem;
}

.FilePreview__Actions--dark {
  background: #333;
  color: #eeeeee;
}

.FilePreview__Action--toolbar {
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  text-transform: uppercase;
  font-family: 'Cabin', sans-serif;
}

.FilePreview__Action--toolbar > i {
  padding-right: 0.2rem;
}
.FilePreview__Message {
  color: inherit;
  margin: 1rem;
}
</style>
