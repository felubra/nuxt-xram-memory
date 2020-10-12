<template>
  <section class="Page AlbumPage">
    <main>
      <BackButton class="BackButton" />
      <DocumentViewer
        :images="images"
        :show-title="true"
      />
    </main>
  </section>
</template>
<script>
import BackButton from '@/components/common/BackButton'
import DocumentViewer from '~/components/viewers/DocumentViewer'

export default {
  name: 'AlbumPage',
  components: {
    BackButton,
    DocumentViewer
  },
  async asyncData ({ $api: { Albums }, route, error }) {
    const albumId = route.params.album_id
    if (albumId) {
      try {
        const album = await Albums.getById(albumId)
        return { album }
      } catch (e) {
        const statusCode = (e.response && e.response.status) || 500
        return error({ statusCode })
      }
    }
    return error({ statusCode: 400 })
  },
  data () {
    return {
      album: {}
    }
  },
  head () {
    return {
      title: this.album.name,
      titleTemplate: 'xraM-Memory - Álbum: %s',
      bodyAttrs: {
        class: 'page--full-screen'
      }
    }
  },
  computed: {
    images () {
      return this.album.photos.map(photo => {
        return {
          src: this.$utils.getMediaUrl(photo.thumbnails.document_preview),
          thumbnailSrc: this.$utils.getMediaUrl(photo.thumbnails.document_thumbnail),
          description: photo.description || ' '
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
main
  display: flex

</style>

<style lang="stylus">
.BackButton
  z-index: 9
  position: absolute
  top: 48px
  left: 24px

.viewer-navbar
  background: transparent

.viewer-title
  color: #000
  font-family: $sans-serif
  font-size: 16px
  text-shadow: 0px 0px 5px #dfdfdf

.viewer-fixed .viewer-title
  color: #efefef
  text-shadow: 0px 0px 5px #000

</style>

<style lang="stylus" scoped>
.AlbumPage
  display: flex
  flex-direction: column
  position: relative
  padding: 0

aside
  flex-basis: 85px

.Thumbnails
  display: flex

.Thumbnails > img
  height: 75px
  padding: 5px

.AlbumPage, main
  flex-grow: 1

.AlbumInfo
  max-width: $max-width
  margin: 0 auto
  width: 100%

</style>
