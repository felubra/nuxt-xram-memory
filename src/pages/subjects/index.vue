<template>
  <section class="Page SubjectsPage">
    <h1 class="offscreen">Assuntos</h1>
    <section v-if="hasFeaturedSubjects" class="SubjectsPage__Featured">
      <header>
        <Microtext tag="h2" arrow="down">Em destaque</Microtext>
      </header>
      <div class="SubjectsList">
        <Card
          v-for="subject in featuredSubjects"
          :key="subject.slug"
          class="SubjectCard"
          :item-link="linkFor(subject)"
          :label="labelFor(subject)"
        >
          <h3 slot="title">{{titleFor(subject)}}</h3>
          <Microtext slot="label">{{ labelFor(subject) }}</Microtext>
          <img slot="image" :src="imageFor(subject)" />
        </Card>
      </div>
      <footer>
        <Microtext arrow="right">
          <nuxt-link :to="{name: 'subjects-all'}">Todos os assuntos</nuxt-link>
        </Microtext>
      </footer>
    </section>
    <section class="SubjectsPage__TagCloud">
      <header>
        <Microtext tag="h2" arrow="down">Nuvem de palavras-chave</Microtext>
      </header>
      <DefaultReactiveBase>
        <HomeTagCloud />
      </DefaultReactiveBase>
    </section>
  </section>
</template>

<script>
import DefaultReactiveBase from '@/components/DefaultReactiveBase'
import HomeTagCloud from '~/components/home/HomeTagCloud'
import Microtext from '~/components/common/Microtext'
import Card from '~/components/common/Card'
import { getMediaUrl } from '~/utils'
const smartTruncate = require('smart-truncate')

export default {
  components: {
    Microtext,
    HomeTagCloud,
    Card,
    DefaultReactiveBase
  },
  data() {
    return {
      featuredSubjects: []
    }
  },
  computed: {
    hasFeaturedSubjects() {
      return this.featuredSubjects.length > 0
    }
  },
  async asyncData({ $axios }) {
    try {
      const featuredSubjects = await $axios.$get(
        `api/v1/subjects/featured?limit=5`
      )
      return {
        featuredSubjects
      }
    } catch {
      return {
        featuredSubjects: []
      }
    }
  },
  methods: {
    labelFor(item) {
      return `${item.items_count} ${item.items_count > 1 ? 'itens' : 'item'}`
    },
    imageFor(item) {
      return getMediaUrl(item.cover)
    },
    titleFor(item) {
      return item.name
    },
    teaserFor(item) {
      return smartTruncate(item.teaser, 180)
    },
    linkFor(item) {
      // #TODO:
      return {
        name: 'subject-slug',
        params: {
          slug: item.slug
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.SubjectsPage > section {
  max-width: $max-width;
  margin: 4rem auto;
}

.SubjectsPage > section.SubjectsPage__TagCloud {
  max-width: none;
}

.SubjectsPage > section.SubjectsPage__TagCloud > header {
  max-width: $max-width;
  margin: 0 auto;
}

.SubjectsPage > section:first-of-type {
  margin-top: 0;
}

.SubjectsList {
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
}

.SubjectCard {
  transition: all 0.25s ease;
  min-height: 475px;
}

.SubjectCard img {
  margin-top: auto;
  position: relative;
  display: inline-block;
  filter: grayscale($grayscale-image);
}

.SubjectCard a:active img, .SubjectCard a:focus img, .SubjectCard a:hover img {
  filter: none;
}

h3, .microtext {
  order: -1;
}

.Card p.microtext {
  color: #777474;
  font-size: 12px;
}

h3 {
  font-family: $small-caps;
  margin-top: 0.25rem;
  margin: 1rem;
  font-size: 22px;
  line-height: 25px;
  text-align: center;
  color: #000000;
  word-break: break-word;
}

footer {
  text-align: right;
}

@media only screen and (min-width: 768px) {
  .SubjectsList {
    grid-template-columns: repeat(5, auto);
  }
}
</style>
