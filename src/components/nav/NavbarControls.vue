<template>
  <div class="NavbarControls">
    <a
      id="Navbar__MenuToggle"
      class="Navbar__Item"
      href="#main-menu"
      @click.prevent="toggleMenu"
    >
      <i class="material-icons">{{ closeIcon }}</i>
    </a>
    <nuxt-link
      v-for="(page, index) in pageLinks('menu-controls')"
      :key="index"
      class="Navbar__Item"
      :to="$utils.urlOrRoute(page)"
    >
      <i class="material-icons">{{ page.icon }}</i>
    </nuxt-link>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'NavbarControls',
  computed: {
    closeIcon () {
      return this.menuVisible ? 'close' : 'menu'
    },
    ...mapGetters(['pageLinks']),
    ...mapState(['menuVisible'])
  },
  methods: mapActions(['toggleMenu'])
}
</script>

<style lang="stylus" scoped>
.NavbarControls, a {
  align-items: center;
  display: flex;
  color: #555;
  border-bottom: solid 2px transparent;
  margin: 0 0.5rem;
  outline: none;
  transition: color 0.25s ease;
}

.NavbarControls {
  border-bottom: none;
}

.NavbarControls {
  align-items: stretch;
}

@media only screen and (min-width: $tablet) {
  #Navbar__MenuToggle {
    display: none;
  }
}
</style>
