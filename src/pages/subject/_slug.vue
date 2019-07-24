<template>
  <section class="Page SubjectPage">
    <section class="SubjectInfo">
      <header>
        <Microtext arrow="down">Assunto</Microtext>
        <h1>{{subject.name}}</h1>
      </header>
      <section v-if="description" class="Subject__Description">
        <div v-html="description"></div>
      </section>
    </section>
    <section class="SubjectItems">
      <DefaultReactiveBase>
        <ReactiveList
          component-id="SubjectItemsList"
          :pagination="false"
          data-field="title.raw"
          :default-query="subjectQuery"
          class-name="SubjectItemsList"
          loader="Carregando..."
          render-error="Oops, infelizmente um erro aconteceu, tente novamente mais tarde."
          :inner-class="{
            resultsInfo: 'SubjectItemsList__ResultsInfo microtext',
            list: 'SubjectItemsList__List'
          }"
          :from="0"
          :size="20"
        >
          <div slot="renderResultStats" slot-scope="{ totalResults, time }">
            <Microtext
              arrow="down"
            >{{totalResults}} {{totalResults > 1 ? 'resultados' : 'resultado'}} em {{time}}ms</Microtext>
          </div>
          <NewsGrid
            id="SubjectsMasonryGrid"
            slot="renderAllData"
            slot-scope="{ results }"
            :items="results"
          ></NewsGrid>
        </ReactiveList>
      </DefaultReactiveBase>
    </section>
  </section>
</template>

<script>
import { sanitize, getMediaUrl } from '@/utils'
import Microtext from '@/components/common/Microtext'
import NewsGrid from '~/components/news/NewsGrid'
import DefaultReactiveBase from '@/components/DefaultReactiveBase'

export default {
  name: 'SubjectPage',
  components: {
    Microtext,
    NewsGrid,
    DefaultReactiveBase
  },
  data() {
    return {
      subject: {}
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
        return {
          subject
        }
      } catch (e) {
        const statusCode = (e.response && e.response.status) || 500
        return error({ statusCode })
      }
    }
    error({ statusCode: 400 })
  },

  methods: {
    subjectQuery() {
      return {
        query: {
          bool: {
            must: [
              {
                bool: {
                  must: [
                    {
                      nested: {
                        path: 'subjects',
                        query: {
                          terms: { 'subjects.name': [this.subject.name] }
                        }
                      }
                    }
                  ]
                }
              }
            ]
          }
        },
        size: 20,
        _source: { includes: ['*'], excludes: [] },
        from: 0
      }
    }
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
