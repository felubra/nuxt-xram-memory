<template>
  <section class="ImagesPage">
    <h1 class="offscreen">Imagens</h1>
    <template v-if="hasAlbums">
      <!--<section class="ImagesPage__Featured">
      <Microtext arrow="down">Álbuns em destaque</Microtext>
      <div class="albumsList">
        <SubjectCard :subject="leftSubject" />
        <SubjectCard :subject="featuredSubject" :big="true" />
      </div>
      </section>-->
      <section class="OtherAlbuns">
        <header>
          <Microtext tag="h2" arrow="down">Mais Álbuns</Microtext>
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
    </template>
    <template v-else>
      <section class="NoAlbuns">
        <header>
          <Microtext tag="h2" arrow="down">Sem dados</Microtext>
        </header>
        <main>
          <p>Não existem álbuns a exibir no momento, por-favor, volte mais tarde.</p>
        </main>
      </section>
    </template>
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
  computed: {
    hasAlbums() {
      return this.albums.length > 0
    }
  },
  async asyncData({ $axios, route, error }) {
    try {
      const albums = await $axios.$get(`api/v1/albums`)
      return {
        albums
      }
    } catch (e) {
      const statusCode = (e.response && e.response.status) || 500
      if (statusCode === 404) {
        return {
          albums: []
        }
      }
      error({ statusCode })
    }
  }
}
</script>

<style lang="stylus" scoped>
h1 {
  margin: 0;
}

.NoAlbuns p {
  margin: 0;
}

.ImagesPage > section {
  display: flex;
  margin: 4rem auto;
  max-width: $max-width;
  flex-flow: wrap;
}

.ImagesPage > section:first-of-type {
  margin-top: 0;
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
