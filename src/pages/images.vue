<template>
  <section class="ImagesPage">
    <!--<section class="ImagesPage__Featured">
      <Microtext arrow="down">Álbuns em destaque</Microtext>
      <div class="albumsList">
        <SubjectCard :subject="leftSubject" />
        <SubjectCard :subject="featuredSubject" :big="true" />
      </div>
    </section>-->
    <section class="OtherAlbuns">
      <header>
        <Microtext arrow="down">Mais Álbuns</Microtext>
      </header>
      <div class="AlbumList">
        <ImageCard
          v-for="album in albums"
          :key="album.album_id"
          class="Album"
          :small="true"
          :item="album"
        />
      </div>
      <footer>
        <Microtext arrow="right">Ver todos os álbuns</Microtext>
      </footer>
    </section>
  </section>
</template>

<script>
import Microtext from '~/components/common/Microtext'
import ImageCard from '~/components/news/ImageCard'

import reactiveMixin from '~/utils/reactiveMixin'

export default {
  components: {
    Microtext,
    ImageCard
  },
  mixins: [reactiveMixin],
  data() {
    return {
      albums: []
    }
  },
  async asyncData({ $axios, route, error }) {
    const albums = await $axios.$get(`api/v1/albums`)
    return {
      albums
    }
  }
}
</script>

<style lang="stylus" scoped>
.OtherAlbuns {
  display: flex;
  margin: 0 auto;
  max-width: $max-width;
  flex-flow: wrap;
}

section > footer, section > header {
  width: 100%;
}

section > footer {
  text-align: right;
}

.AlbumList {
  width: 100%;
  display: flex;
  padding: 0.5rem 0;
}

.AlbumList > .Album {
  margin-right: 1rem;
}
</style>
