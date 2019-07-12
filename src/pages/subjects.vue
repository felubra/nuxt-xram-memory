<template>
  <section class="SubjectsPage">
    <section class="SubjectsPage__Featured">
      <header>
        <Microtext arrow="down">Assuntos em destaque</Microtext>
      </header>
      <div class="SubjectsList">
        <SubjectCard :subject="leftSubject" />
        <SubjectCard :subject="featuredSubject" :big="true" />
      </div>
      <footer>
        <Microtext arrow="right">Todos os assuntos</Microtext>
      </footer>
    </section>
    <section class="SubjectsPage__TagCloud">
      <header>
        <Microtext arrow="down">Nuvem de palavras-chave</Microtext>
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
import HomeTagCloud from '~/components/home/HomeTagCloud'

import reactiveMixin from '~/utils/reactiveMixin'

export default {
  components: {
    Microtext,
    SubjectCard,
    HomeTagCloud
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
  }
}
</script>

<style lang="stylus" scoped>
.SubjectsList {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
}

.SubjectsList > .SubjectCard {
  margin-right: 1rem;
}

.SubjectsPage__Featured > .SubjectsList > .SubjectCard:last-child {
  flex-grow: 1;
  margin-right: 0;
}

.SubjectsPage__TagCloud, .SubjectsPage__Featured {
  max-width: $max-width;
  margin: 4rem auto;
}

section > footer {
  text-align: right;
}
</style>
