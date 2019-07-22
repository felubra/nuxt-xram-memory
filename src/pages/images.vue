<template>
  <section class="Page ImagesPage">
    <h1 class="offscreen">Imagens</h1>
    <template v-if="hasAlbums">
      <section class="OtherAlbums">
        <header>
          <Microtext tag="h2" arrow="down">Todos os álbums</Microtext>
        </header>
        <div class="AlbumList">
          <Card
            v-for="album in albums"
            :key="album.album_id"
            :item-link="linkFor(album)"
            :image="imageFor(album)"
            :label="labelFor(album)"
          >
            <h3 slot="title">{{album.name}}</h3>
          </Card>
        </div>
      </section>
    </template>
    <template v-else>
      <section>
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
import Card from '~/components/common/Card'

const { getMediaUrl } = require('~/utils')

export default {
  components: {
    Microtext,
    Card
  },
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
    },
    featuredAlbums() {
      //TODO: filtrar featured = true
      return this.albums.slice(0, 3)
    },
    otherAlbums() {
      return this.hasFeaturedAlbums ? this.albums.slice(3) : this.albums
    }
  },
  async asyncData({ $axios }) {
    try {
      const albums_objects = await $axios.$get(`api/v1/albums`)
      return {
        albums_objects
      }
    } catch (e) {
      return {
        albums_objects: []
      }
    }
  },
  methods: {
    labelFor(item) {
      if (item.file_count) {
        return item.file_count > 1
          ? `${item.file_count} itens`
          : `${item.file_count} item`
      }
      return ''
    },
    imageFor(item) {
      return item.cover
    },
    titleFor(item) {
      return item.name
    },

    linkFor(item) {
      return {
        name: 'album-album_id',
        params: {
          album_id: item.album_id
        }
      }
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-column-gap: 20px;
  grid-row-gap: 20px;
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

.OtherAlbums .Card {
  height: 250px;
}

h3 {
  font-family: $small-caps;
  margin-top: 0.25rem;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  color: #000000;
}

@media only screen and (min-width: $tablet) {
  .FeaturedAlbums {
    grid-template-areas: 'f1 f2' 'f1 f3';
    grid-template-columns: 1fr 270px;
    grid-template-rows: 200px 200px;
  }
}
</style>
