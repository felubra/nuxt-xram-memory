<template>
  <ul class="SubjectList">
    <li v-for="subject in subjects" :key="subject.slug">
      <nuxt-link
        :to="{
            name: 'subject-slug',
            params: {
              slug: subject.slug
            }
          }"
      >{{subject.name}}</nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AllSubjectsSubPage',
  data() {
    return {
      subjects: []
    }
  },
  async asyncData({ $axios, error, route }) {
    const { slug } = route.params
    if (slug) {
      try {
        const subjects = await $axios.$get(`api/v1/subjects/initial/${slug}`)
        return {
          subjects
        }
      } catch {
        return error(404, 'Inicial não encontrada')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
a {
  color: #343333;
}

header ul {
  list-style: none;
  padding: 0;
  font-size: 36px;
  color: #555;
  margin: 0;
  display: grid;
  grid-column-gap: 1rem;
  grid-auto-rows: max-content;
  grid-auto-columns: max-content;
  grid-template-columns: repeat(min-maxauto-fill, 1fr);
  grid-template-columns: repeat(auto-fill, minmax(24px, 1fr));
  width: 100%;
  align-items: center;
  justify-content: center;
  justify-items: center;
  align-content: center;
}

header ul > li {
  margin: 0;
  cursor: pointer;
}

header ul > li:first-of-type {
  margin-left: 0;
}

header ul > li:last-of-type {
  margin-right: 0;
}

main ul {
  column-count: 2;
  padding: 0;
  list-style: none;
  font-size: 22px;
}
</style>
