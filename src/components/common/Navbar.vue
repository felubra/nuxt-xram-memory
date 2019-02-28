<template>
  <nav class="Navbar">
    <a class="Navbar__Item" href="#main-menu" @click.prevent="menuToggle">
      <i class="material-icons">menu</i>
    </a>
    <Logo/>
    <nuxt-link class="Navbar__Item" to="/search">
      <i class="material-icons">search</i>
    </nuxt-link>
  </nav>
</template>
<script>
import { mapActions } from 'vuex'
import Logo from './Logo'
export default {
  name: 'Navbar',
  components: {
    Logo
  },
  methods: {
    menuToggle() {
      this.toggleMenu()
    },
    ...mapActions(['toggleMenu'])
  }
}
</script>
<style scoped>
.Navbar {
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0.5rem;
  background: #fff;
  box-sizing: border-box;
  z-index: 8;
}

.NavBar--fixed {
  position: fixed;
  backface-visibility: hidden;
  width: 100%;
}

.Navbar__Item {
  color: #333;
}
</style>
