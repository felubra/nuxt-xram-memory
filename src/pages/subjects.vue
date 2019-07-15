<template>
  <section class="SubjectsPage">
    <h1 class="offscreen">Assuntos</h1>
    <section class="SubjectsPage__Featured">
      <header>
        <Microtext tag="h2" arrow="down">Em destaque</Microtext>
      </header>
      <div class="SubjectsList">
        <NewCard
          class="SubjectCard"
          :item-link="linkFor(leftSubject)"
          :label="labelFor(leftSubject)"
        >
          <h3 slot="title">{{titleFor(leftSubject)}}</h3>
          <Microtext slot="label">{{ labelFor(leftSubject) }}</Microtext>
          <img slot="image" :src="imageFor(leftSubject)" />
        </NewCard>
        <NewCard
          class="SubjectCard SubjectCard--big"
          :item-link="linkFor(featuredSubject)"
          :label="labelFor(featuredSubject)"
        >
          <h3 slot="title">{{titleFor(featuredSubject)}}</h3>
          <Microtext slot="label">{{ labelFor(featuredSubject) }}</Microtext>
          <img slot="image" :src="imageFor(featuredSubject)" />
        </NewCard>
      </div>
      <footer>
        <Microtext arrow="right">
          <nuxt-link :to="{name: 'index'}">Todos os assuntos</nuxt-link>
        </Microtext>
      </footer>
    </section>
    <section class="SubjectsPage__TagCloud">
      <header>
        <Microtext tag="h2" arrow="down">Nuvem de palavras-chave</Microtext>
      </header>
      <ReactiveBase
        class-name="PageIndex"
        app="artifact_document,artifact_news"
        :url="reactiveServerURL"
        :theme="reactiveDefaultTheme"
        :credentials="reactiveCredentials"
      >
        <HomeTagCloud />
      </ReactiveBase>
    </section>
  </section>
</template>

<script>
import Microtext from '~/components/common/Microtext'
import SubjectCard from '~/components/SubjectCard'
import NewCard from '~/components/news/NewCard'
import HomeTagCloud from '~/components/home/HomeTagCloud'
import { getMediaUrl } from '~/utils'

import reactiveMixin from '~/utils/reactiveMixin'

export default {
  components: {
    Microtext,
    SubjectCard,
    HomeTagCloud,
    NewCard
  },
  mixins: [reactiveMixin],
  data() {
    return {
      subjects: []
    }
  },
  computed: {
    leftSubject() {
      return this.subjects[0]
    },
    featuredSubject() {
      return this.subjects[1]
    }
  },
  async asyncData({ $axios, route, error }) {
    const subjects = await $axios.$get(`api/v1/subjects/page`)
    return {
      subjects
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
        name: 'index'
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
