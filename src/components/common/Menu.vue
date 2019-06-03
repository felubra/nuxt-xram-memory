<template>
  <div :class="menuVisible ? 'Menu Menu--visible': 'Menu'">
    <header class="Menu__Header">
      <a class="Menu__CloseButton" href="#close" @click.prevent="toggleMenu">
        <i class="material-icons">close</i>
      </a>
      <Logo class="Menu__Logo" variant="pb--branco"/>
    </header>
    <ul class="Menu__Items Menu__Items--big">
      <li
        v-for="(page, index) in menuLinks()"
        :key="`menu--${index}`"
        class="Menu__Item Menu__Item--big"
      >
        <nuxt-link
          :title="page.title"
          :alt="`Clique para visitar a página '${page.title}'`"
          :to="urlOrRoute(page)"
        >
          <i class="material-icons-outlined">{{page.icon || 'info'}}</i>
          {{page.title}}
        </nuxt-link>
      </li>
    </ul>
    <footer class="Menu__Footer">
      <p class="center">Copyright © 2019 xraM-Memory</p>
      <ul class="Menu__Items Menu__Items--inline">
        <li
          v-for="(page, index) in menuLinks('menu-footer')"
          :key="`menu--footer${index}`"
          class="Menu__Item Menu__Item--inline"
        >
          <nuxt-link
            :title="page.title"
            :alt="`Clique para visitar a página '${page.title}'`"
            :to="urlOrRoute(page)"
          >{{page.title}}</nuxt-link>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
import Logo from './Logo'
import { mapState, mapActions, mapGetters } from 'vuex'
import { sanitize } from '@/utils/'

export default {
  name: 'Menu',
  components: {
    Logo
  },
  computed: {
    ...mapState(['menuVisible']),
    ...mapGetters(['menuLinks'])
  },
  methods: {
    ...mapActions(['toggleMenu']),
    urlOrRoute(item) {
      return typeof item.url === 'object'
        ? item.url
        : {
            name: 'slug',
            params: {
              slug: sanitize(item.url)
            }
          }
    },
    keyForLink(item) {
      return typeof item.url === 'object' ? item.url.name : item.url
    }
  }
}
</script>

<style scoped>
.Menu {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  height: 100%;
  background: #ce5454;
  z-index: 10;
  transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.25s;
  transform: translate3d(-100%, 0, 0);
  backface-visibility: hidden;
  width: 350px;
}

.Menu--visible {
  transform: translate3d(0, 0, 0);
}

.Menu__Header {
  text-align: center;
  padding: 0.35rem 0.5rem;
  display: flex;
  align-items: center;
}

.Logo {
  flex-grow: 1;
}

.Menu__CloseButton {
  color: #f3f1f1;
  display: flex;
  align-items: center;
  text-decoration: none;
}

.Menu__Items {
  list-style: none;
  margin: 0;
  flex-grow: 1;
}

.Menu__Item {
  color: #fff;
}

.Menu__Item a {
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.Menu__Item i {
  padding: 0 1rem;
}

.Menu__Items--big {
  list-style: none;
  margin: 0;
  padding: 1rem 2rem;
  margin: 0 1.5rem 0 0;
  padding-top: 25vh;
  font-size: 1.2rem;
  flex-grow: 1;
}

.Menu__Item--big {
  color: #fff;
  margin: 1rem 0;
}

.Menu__Item--big a {
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.Menu__Item--big i {
  padding: 0 1rem;
}

.Menu__Items--inline {
  display: flex;
  justify-content: space-around;
  margin: 1rem;
  padding: 0;
}

.Menu__Item--inline {
  margin: 0 0.5rem;
}

.Menu__Footer {
  justify-self: flex-end;
  font-family: 'Cabin', sans-serif;
  font-size: 0.675rem;
  text-transform: uppercase;
  color: #fff;
  text-align: center;
  padding-bottom: 1rem;
}
</style>
