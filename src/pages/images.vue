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
  name: 'AlbumsPage',
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
    albums() {
      return this.albums_objects.map(album => {
        album.big_cover = getMediaUrl(album.big_cover)
        album.cover = getMediaUrl(album.cover)
        return album
      })
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
  grid-auto-flow: row;
  grid-template-columns: repeat(auto-fill, 250px);
  width: 100%;
  grid-column-gap: 20px;
  display: grid;
  grid-row-gap: 20px;
  justify-content: space-evenly;
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
}
</style>
