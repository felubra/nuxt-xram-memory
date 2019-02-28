<template>
  <div :class="menuVisible ? 'Menu Menu--visible': 'Menu'">
    <header class="Menu__Header">
      <a class="Menu__CloseButton" href="#close" @click.prevent="toggleMenu">
        <i class="material-icons">close</i>
      </a>
      <Logo class="Menu__Logo" variant="pb--branco"/>
    </header>
    <ul class="Menu__Items Menu__Items--big">
      <li class="Menu__Item Menu__Item--big">
        <nuxt-link :to="{name: 'search-query'}">
          <i class="material-icons">search</i>Pesquisar
        </nuxt-link>
      </li>
      <li class="Menu__Item Menu__Item--big">
        <nuxt-link to="about">
          <i class="material-icons">info</i>Sobre o projeto
        </nuxt-link>
      </li>
      <li class="Menu__Item Menu__Item--big">
        <nuxt-link to="contact">
          <i class="material-icons">feedback</i>Contato
        </nuxt-link>
      </li>
    </ul>
    <footer class="Menu__Footer">
      <p class="center">Copyright © 2019 Xram-Memory</p>
      <ul class="Menu__Items Menu__Items--inline">
        <li class="Menu__Item Menu__Item--inline">
          <nuxt-link :to="{name: 'page', params:{slug: 'terms'}}">Termos de uso</nuxt-link>
        </li>
        <li class="Menu__Item Menu__Item--inline">
          <nuxt-link :to="{name: 'page', params:{slug: 'privacy_terms'}}">Política de Privacidade</nuxt-link>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
import Logo from './Logo'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Menu',
  components: {
    Logo
  },
  methods: {
    ...mapActions(['toggleMenu'])
  },
  computed: {
    ...mapState(['menuVisible'])
  }
}
</script>

<style scoped>
.Menu {
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  background: #ce5454;
  z-index: 10;
  transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.25s;
  transform: translate3d(-100%, 0, 0);
}

.Menu--visible {
  transform: translate3d(0, 0, 0);
}

.Menu__Header {
  text-align: center;
  padding: 1rem 0.5rem;
  display: flex;
  align-items: center;
}

.Logo {
  flex-grow: 1;
}

.Menu__CloseButton {
  color: #f3f1f1;
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
  font-size: 1.375rem;
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
  display: inline;
}

.Menu__Footer {
  justify-self: flex-end;
  font-family: 'Cabin', sans-serif;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #fff;
  text-align: center;
  padding-bottom: 1rem;
}
</style>
