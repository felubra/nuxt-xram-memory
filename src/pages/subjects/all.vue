<template>
  <section class="Page CenteredPage">
    <h1 class="offscreen">Todos os assuntos</h1>
    <template v-if="hasInitials">
      <header>
        <Microtext arrow="down">Assuntos (em ordem alfabética)</Microtext>
        <ul>
          <li v-for="initial in initials" :key="initial">
            <nuxt-link
              :to="{
              name: 'subjects-all-slug',
              params: {
                slug: initial
              }
            }"
            >{{initial}}</nuxt-link>
          </li>
        </ul>
      </header>

      <main>
        <nuxt-child />
      </main>
    </template>
    <template v-else>
      <header>
        <Microtext arrow="down">Sem dados</Microtext>
      </header>
      <main>
        <p>Não existem assuntos para exibir no momento, por-favor volte mais tarde.</p>
      </main>
    </template>
  </section>
</template>

<script>
import Microtext from '~/components/common/Microtext'

export default {
  name: 'AllSubjectsPage',
  components: {
    Microtext
  },
  data() {
    return {
      initials: [],
      selectedInitial: ''
    }
  },
  computed: {
    hasInitials() {
      return this.initials.length > 0
    }
  },
  watch: {
    selectedInitial: {
      handler(initial) {
        if (initial) {
          this.fetchSubjectsForInitial()
        }
      }
    }
  },
  async asyncData({ $axios, $router, redirect, route }) {
    const { slug } = route.params
    try {
      const initials = await $axios.$get(`api/v1/subjects/initials`)

      let selectedInitial = ''
      if (Array.isArray(initials) && initials.length > 0) {
        selectedInitial = initials[0]

        /** Se houver ao menos uma inicial definida, vá para ela */
        if (selectedInitial && !slug) {
          return redirect(302, {
            name: 'subjects-all-slug',
            params: {
              slug: selectedInitial
            }
          })
        }
      }
      return {
        initials,
        selectedInitial
      }
    } catch {
      return {
        initials: []
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
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
