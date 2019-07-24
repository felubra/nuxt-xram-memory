<template>
  <div :class="menuVisible ? 'Menu Menu--visible': 'Menu'">
    <header>
      <Logo variant="pb--branco" />
      <NavbarControls />
    </header>
    <ul class="Menu__Items Menu__Items--big">
      <li
        v-for="(page, index) in pageLinks()"
        :key="`menu--${index}`"
        class="Menu__Item Menu__Item--big"
      >
        <nuxt-link
          :title="page.title"
          :alt="`Clique para visitar a página '${page.title}'`"
          :to="urlOrRoute(page)"
        >{{page.title}}</nuxt-link>
      </li>
    </ul>
    <footer class="Menu__Footer">
      <p class="center">Copyright © 2019 xraM-Memory</p>
      <ul class="Menu__Items Menu__Items--inline">
        <li
          v-for="(page, index) in pageLinks('menu-footer')"
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
import Logo from '@/components/nav/Logo'
import { mapState, mapActions, mapGetters } from 'vuex'
import { urlOrRoute } from '@/utils/'
import NavbarControls from '@/components/nav/NavbarControls'

export default {
  name: 'Menu',
  components: {
    Logo,
    NavbarControls
  },
  computed: {
    ...mapState(['menuVisible']),
    ...mapGetters(['pageLinks'])
  },
  methods: {
    ...mapActions(['toggleMenu']),
    urlOrRoute,
    keyForLink(item) {
      return typeof item.url === 'object' ? item.url.name : item.url
    }
  }
}
</script>

<style lang="stylus" scoped>
header {
  display: flex;
  padding: 0 $min-padding;
  min-height: 100px;
  align-items: stretch;
}

header > * {
  display: flex;
  align-items: center;
}

.Menu {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  height: 100%;
  background: #ce5454;
  z-index: 999;
  transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.25s;
  transform: translate3d(0, -100%, 0);
  backface-visibility: hidden;
  width: 100%;
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
  border-bottom: solid 2px transparent;
  transition: border-color 0.25s ease;
}

.Menu__Item a:active, .Menu__Item a:focus, .Menu__Item a:hover, .Menu__Item a.nuxt-link-exact-active {
  border-color: #fff;
}

.Menu__Item i {
  padding: 0 1rem;
}

.Menu__Items--big {
  list-style: none;
  margin: auto 0;
  font-size: 1.2rem;
  text-align: center;
  font-size: 140%;
  padding: 0;
  flex-grow: 0;
}

.Menu__Item--big {
  color: #fff;
  margin: 1rem 0;
}

.Menu__Item--big a {
  color: inherit;
  text-decoration: none;
  display: inline-flex;
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

.NavbarControls >>> a {
  color: #fbfafa;
}

.NavbarControls >>> a:hover, .NavbarControls >>> a:active, .NavbarControls >>> a:focus, .NavbarControls >>> a.nuxt-link-exact-active {
  color: #fbfafa;
  border-color: #fff;
}

@media only screen and (min-width: $tablet) {
  .Menu {
    display: none;
  }
}
</style>
