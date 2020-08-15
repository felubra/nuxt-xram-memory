<template>
  <section class="Page SubjectPage">
    <section class="SubjectInfo">
      <header>
        <Microtext arrow="down">Assunto</Microtext>
        <h1>{{subject.name}}</h1>
      </header>
      <section v-if="description" class="Subject__Description">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="description"></div>
      </section>
    </section>
    <section class="SubjectItems">
      <NewsGrid id="SubjectsMasonryGrid" :items="subjectItems"></NewsGrid>
    </section>
  </section>
</template>

<script>
import { sanitize, getMediaUrl } from '@/utils'
import Microtext from '@/components/common/Microtext'
import NewsGrid from '~/components/news/NewsGrid'

export default {
  name: 'SubjectPage',
  components: {
    Microtext,
    NewsGrid
  },
  data() {
    return {
      subject: {},
      subjectItems: []
    }
  },
  head() {
    return {
      title: this.subject.name,
      titleTemplate: 'xraM-Memory - Assunto: %s'
    }
  },
  computed: {
    description() {
      return sanitize(this.subject.description)
    },
    cover() {
      return getMediaUrl(this.subject.big_cover)
    }
  },
  async asyncData({ $axios, route, error }) {
    const { slug } = route.params
    if (slug) {
      try {
        const subject = await $axios.$get(`api/v1/subject/${slug}`)
        const subjectItems = await $axios.$get(`api/v1/subject/${slug}/items`)
        return { subject, subjectItems }
      } catch (e) {
        const statusCode = (e.response && e.response.status) || 500
        return error({ statusCode })
      }
    }
    return error({ statusCode: 400 })
  }
}
</script>
<style lang="stylus">
.SubjectItemsList > .SubjectItemsList__ResultsInfo {
  max-width: $max-width;
  margin: 0 auto;
  display: block;
}

.SubjectItemsList > .masonry-container {
  margin: 0 auto;
}
</style>


<style lang="stylus" scoped >
section > header, section > section, section > main {
  max-width: $max-width;
  margin: 0 auto;
}

.Subject__Description > div {
  text-align: justify;
  flex-basis: 750px;
  line-height: 1.5;
}

.Subject__Description > img {
  margin: 20px;
}

.Subject__Description {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
}

.SubjectItemsList__ResultsInfo {
}

@media only screen and (min-width: $tablet) {
  .Subject__Description {
    flex-direction: row;
  }
}
</style>
