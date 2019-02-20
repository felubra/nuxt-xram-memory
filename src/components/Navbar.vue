<template>
  <nav class='Navbar'>
    <a class="Navbar__Item" href="#main-menu" @click.prevent="menuToggle"><img src="/menu.svg" alt=""></a>
    <nuxt-link class="Navbar__Item" to="/"><Logo /></nuxt-link>
    <nuxt-link class="Navbar__Item" to="search"><img src="/baseline-search.svg" alt=""></nuxt-link>
  </nav>
</template>
<script>
import Logo from './Logo'
export default {
  name: 'Navbar',
  components: {
    Logo
  },
  methods: {
    menuToggle() {
      this.$emit('menuToggle')
    }
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
}
</style>
