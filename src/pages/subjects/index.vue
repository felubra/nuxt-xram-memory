<template>
  <section class="Page SubjectsPage">
    <h1 class="offscreen">Assuntos</h1>
    <template v-if="hasContent">
      <section class="SubjectsPage__Featured">
        <header>
          <Microtext tag="h2" arrow="down">Em destaque</Microtext>
        </header>
        <div class="SubjectsList">
          <Card
            class="SubjectCard"
            :item-link="linkFor(leftSubject)"
            :label="labelFor(leftSubject)"
          >
            <h3 slot="title">{{titleFor(leftSubject)}}</h3>
            <Microtext slot="label">{{ labelFor(leftSubject) }}</Microtext>
            <img slot="image" :src="imageFor(leftSubject)" />
          </Card>
          <Card
            class="SubjectCard SubjectCard--big"
            :item-link="linkFor(featuredSubject)"
            :label="labelFor(featuredSubject)"
          >
            <h3 slot="title">{{titleFor(featuredSubject)}}</h3>
            <Microtext slot="label">{{ labelFor(featuredSubject) }}</Microtext>
            <img slot="image" :src="imageFor(featuredSubject)" />
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
    </template>
    <template v-else>
      <section>
        <header>
          <Microtext tag="h2" arrow="down">Sem dados</Microtext>
        </header>
        <main>
          <p>Não existem assuntos para exibir no momento, por-favor volte mais tarde.</p>
        </main>
      </section>
    </template>
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
      subjects: []
    }
  },
  computed: {
    hasContent() {
      return this.subjects.length > 0
    },
    leftSubject() {
      return this.subjects[0]
    },
    featuredSubject() {
      return this.subjects[1]
    }
  },
  async asyncData({ $axios }) {
    try {
      const subjects = await $axios.$get(`api/v1/subjects/page`)
      return {
        subjects
      }
    } catch {
      return {
        subjects: []
      }
    }
  },
  methods: {
    labelFor(item) {
      return `${item.items_count} ${item.items_count > 1 ? 'itens' : 'item'}`
    },
    imageFor(item) {
      return getMediaUrl(item.big_cover)
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
  grid-template-areas: 'l' 'f';
  grid-template-columns: 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
}

.SubjectCard {
  transition: all 0.25s ease;
  min-height: 475px;
}

.SubjectCard--big {
  padding: 1rem;
}

.SubjectCard.SubjectCard--big img {
  margin: auto 0;
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
    grid-template-areas: 'l f';
    grid-template-columns: 250px 1fr;
  }
}
</style>
