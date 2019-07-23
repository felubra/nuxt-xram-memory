<template v-if="hasInitials">
  <div class="SubjectPicker">
    <header>
      <Microtext arrow="down">Assuntos (em ordem alfabética)</Microtext>
      <ul class="InitialsList">
        <li v-for="initial in initials" :key="initial" @click="selectInitial(initial)">{{initial}}</li>
      </ul>
    </header>
    <section class="SubjectList">
      <ul class="SubjectsList">
        <li v-for="subject in subjects" :key="subject.slug">{{subject.name}}</li>
      </ul>
    </section>
  </div>
</template>
<script>
import Microtext from '~/components/common/Microtext'
export default {
  name: 'SubjectPicker',
  components: {
    Microtext
  },
  props: {
    initials: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectedInitial: '',
      subjects: []
    }
  },
  computed: {
    hasInitials() {
      return Array.isArray(this.initials) && this.initials.length > 0
    }
  },
  watch: {
    initials: {
      immediate: true,
      handler(initials) {
        if (Array.isArray(initials) && initials.length > 0) {
          // Defina a inicial selecionada como a primeira da lista, se não houver inicial selecionada.
          if (!this.selectedInitial) {
            this.selectInitial(initials[0])
          }
        }
      }
    }
  },
  methods: {
    async selectInitial(initial) {
      try {
        const subjectsForInitial = await this.$axios.$get(
          `api/v1/subjects/initial/${initial}`
        )
        this.selectedInitial = initial
        this.subjects = subjectsForInitial
      } catch {}
    }
  }
}
</script>

<style lang="stylus" scoped>
ul {
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

ul > li {
  margin: 0;
  cursor: pointer;
}

a {
  color: #555;
}

a:active, a:hover, a:focus, a.nuxt-link-exact-active {
  color: $link-color;
}

ul > li:first-of-type {
  margin-left: 0;
}

ul > li:last-of-type {
  margin-right: 0;
}

main ul {
  column-count: 2;
  padding: 0;
  list-style: none;
  font-size: 22px;
}
</style>
