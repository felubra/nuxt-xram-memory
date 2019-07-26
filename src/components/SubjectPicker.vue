<template>
  <div class="SubjectPicker">
    <header>
      <Microtext arrow="down">
        Todos os assuntos
        <span>(em ordem alfabética)</span>
      </Microtext>
      <transition name="fade">
        <ul v-if="hasInitials && hasSubjects" class="InitialsList">
          <li
            v-for="initial in initials"
            :key="initial"
            :class="{
            'active': selectedInitial === initial
          }"
            @click="selectInitial(initial)"
          >{{initial}}</li>
        </ul>
      </transition>
    </header>
    <section class="SubjectsList" :style="`min-height: ${minHeight}px`">
      <transition name="fade">
        <ul v-if="hasInitials && hasSubjects" ref="SubjectsList" class="SubjectsList">
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
      </transition>
      <no-ssr>
        <resize-sensor @resize="determineMinHeight"></resize-sensor>
      </no-ssr>
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
    },
    initialSubjects: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectedInitial: '',
      subjects: this.initialSubjects,
      minHeight: 100
    }
  },
  computed: {
    hasInitials() {
      return Array.isArray(this.initials) && this.initials.length > 0
    },
    hasSubjects() {
      return Array.isArray(this.subjects) && this.subjects.length > 0
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
    determineMinHeight({ width, height }) {
      this.minHeight = this.minHeight < height ? height : this.minHeight
    },
    async selectInitial(initial) {
      if (initial === this.selectedInitial) {
        return
      }
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
  font-size: 28px;
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
  color: #343333;
}

a, header li {
  transition: color 0.25s ease;
}

header a {
  color: #888;
}

li.active, li:hover, a:active, a:hover, a:focus, a.nuxt-link-exact-active {
  color: $link-color;
}

ul > li:first-of-type {
  margin-left: 0;
}

ul > li:last-of-type {
  margin-right: 0;
}

ul.SubjectsList {
  display: block;
  column-count: 1;
  padding: 0;
  list-style: none;
  font-size: 20px;
}

section.SubjectsList {
  transition: height 0.25s ease;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to { /* .fade-leave-active below version 2.1.8 */
  opacity: 0;
}

@media only screen and (min-width: $tablet) {
  ul.SubjectsList {
    column-count: 2;
  }
}
</style>
