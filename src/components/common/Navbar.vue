<template>
  <nav class="Navbar">
    <a class="Navbar__Item Navbar__MenuToggle" href="#main-menu" @click.prevent="menuToggle">
      <i class="material-icons">menu</i>
    </a>
    <Logo class="Navbar__Item Navbar__Logo"/>
    <nuxt-link class="Navbar__Item Navbar__Search" to="/search">
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
  backface-visibility: hidden;
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 0.35rem 0.5rem;
  background: transparent;
  box-sizing: border-box;
  z-index: 8;
  height: 3.098rem;
  position: fixed;
  top: 0;
  width: 100%;
  color: #333;
  transform: translate3d(0, 0, 0);
}

.NavBar--fixed {
  background: #fff;
  transition: padding cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s;
}

.Navbar__Item {
  color: inherit;
  display: flex;
  align-items: center;
  text-decoration: none;
}

.Navbar__Logo,
.Navbar__MenuToggle {
  margin-right: auto;
}

@media only screen and (min-width: 768px) {
  .Navbar {
    width: 350px;
  }

  .Navbar__Search {
    display: none;
  }

  .NavBar--fixed {
    width: auto;
    padding: 0;
    background: #ce5454;
    color: #fff;
    min-height: 0;
  }

  body.fixed-sidebar .NavBar--fixed {
    background: transparent;
    color: inherit;
    width: 350px;
    padding: 0.35rem 0.5rem;
  }

  .NavBar--fixed .Navbar__Logo {
    display: none;
  }

  body.fixed-sidebar .NavBar--fixed .Navbar__Logo {
    display: inherit;
  }

  .NavBar--fixed .Navbar__MenuToggle {
    padding: 0 0.5rem;
    min-height: 3.098rem;
  }

  body.fixed-sidebar .NavBar--fixed .Navbar__MenuToggle {
    padding: 0;
    min-height: inherit;
  }
}
</style>
