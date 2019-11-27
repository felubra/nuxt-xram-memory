<template>
  <div v-if="hasInitials && hasSubjects" class="SubjectPicker">
    <header>
      <Microtext arrow="down">
        Todos os assuntos
        <span>(em ordem alfabética)</span>
      </Microtext>
      <transition name="fade">
        <ul class="InitialsList">
          <li v-for="initial in initials" :key="initial">
            <nuxt-link
              :id="initial"
              :title="initial"
              :to="{name:'subjects', hash:`#${initial}`}"
              @click="selectInitial(initial)"
            >{{initial}}</nuxt-link>
          </li>
        </ul>
      </transition>
    </header>
    <section class="SubjectsList" :style="`min-height: ${minHeight}px`">
      <ul ref="SubjectsList" class="SubjectsList">
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
      <client-only>
        <resize-sensor @resize="determineMinHeight"></resize-sensor>
      </client-only>
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
    },
    initialSelectedInitial: {
      type: String,
      default: 'A'
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
    },
    hashInitial() {
      return this.$route && this.$route.hash[1]
    }
  },
  watch: {
    initials: {
      handler(initials) {
        if (!this.selectedInitial && initials.length) {
          this.$router.push({ name: 'subjects', hash: `#${initials[0]}` })
        }
      }
    },
    selectedInitial: {
      immediate: true,
      async handler(initial) {
        try {
          if (!initial) {
            return
          }
          const subjectsForInitial = await this.$axios.$get(
            `api/v1/subjects/initial/${initial}`
          )
          this.$nextTick(() => (this.subjects = subjectsForInitial))
        } catch {}
      }
    },
    $route: {
      immediate: true,
      handler() {
        if (
          this.hashInitial &&
          this.initials &&
          this.initials.includes(this.hashInitial)
        ) {
          this.$nextTick(() => this.selectInitial(this.hashInitial))
        }
      }
    }
  },
  methods: {
    determineMinHeight({ width, height }) {
      this.minHeight = this.minHeight < height ? height : this.minHeight
    },
    selectInitial(initial) {
      if (initial === this.selectedInitial) {
        return
      }
      this.selectedInitial = initial
    }
  }
}
</script>

<style lang="stylus" scoped>
ul {
  list-style: none;
  padding: 0;
  font-size: 22px;
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
