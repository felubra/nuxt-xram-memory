<template>
  <section class="ImagesPage">
    <h1 class="offscreen">Imagens</h1>
    <template v-if="hasAlbums">
      <section class="ImagesPage__Featured">
        <Microtext arrow="down">Álbuns em destaque</Microtext>
        <div class="FeaturedAlbums">
          <div class="FeaturedAlbum f1">
            <img :src="albums[0].big_cover" />
          </div>
          <div class="FeaturedAlbum f2">
            <img :src="albums[1].cover" />
          </div>
          <div class="FeaturedAlbum f3">
            <h3>{{albums[1].name}}</h3>
            <img :src="albums[1].cover" />
          </div>
        </div>
      </section>
      <section class="OtherAlbuns">
        <header>
          <Microtext tag="h2" arrow="down">{{hasFeaturedAlbums? 'Mais Álbuns' : 'Todos os álbums'}}</Microtext>
        </header>
        <div class="AlbumList">
          <NewsCard
            v-for="album in albums"
            :key="album.album_id"
            class="Album"
            :small="true"
            :show-title="true"
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
import NewsCard from '~/components/news/NewsCard'
import reactiveMixin from '~/utils/reactiveMixin'

const { getMediaUrl, sanitize, cardImageDimensions } = require('~/utils')

export default {
  components: {
    Microtext,
    NewsCard
  },
  mixins: [reactiveMixin],
  data() {
    return {
      albums_objects: []
    }
  },
  computed: {
    hasAlbums() {
      return this.albums.length > 0
    },
    hasFeaturedAlbums() {
      return this.albums.length > 3
    },
    albums() {
      return this.albums_objects.map(album => {
        album.big_cover = getMediaUrl(album.big_cover)
        album.cover = getMediaUrl(album.cover)
        return album
      })
    }
  },
  async asyncData({ $axios, route, error }) {
    try {
      const albums_objects = await $axios.$get(`api/v1/albums`)
      return {
        albums_objects
      }
    } catch (e) {
      const statusCode = (e.response && e.response.status) || 500
      if (statusCode === 404) {
        return {
          albums_objects: []
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

.ImagesPage__Featured {
}

.FeaturedAlbums {
  width: 100%;
  display: grid;
  grid-template-areas: 'f1' 'f2' 'f3';
  grid-template-columns: 1fr;
  column-gap: 20px;
  row-gap: 20px;
}

.FeaturedAlbum {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
}

.FeaturedAlbum > img {
  position: absolute;
}

.FeaturedAlbum > h3 {
  z-index: 500;
  align-self: flex-end;
}

.FeaturedAlbums > .f1, .FeaturedAlbums > .f2, .FeaturedAlbums > .f3 {
  background: #ccc;
}

.FeaturedAlbums > .f1 {
  grid-area: f1;
}

.FeaturedAlbums > .f2, .FeaturedAlbums > .f1 {
}

.FeaturedAlbums > .f2 {
  grid-area: f2;
}

.FeaturedAlbums > .f3 {
  grid-area: f3;
}

@media only screen and (min-width: $tablet) {
  .FeaturedAlbums {
    grid-template-areas: 'f1 f2' 'f1 f3';
    grid-template-columns: 1fr 270px;
    grid-template-rows: 200px 200px;
  }
}
</style>
