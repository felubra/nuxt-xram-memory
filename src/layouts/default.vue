<template>
  <div id="main-wrapper">
    <header>
      <Menu/>
      <fixed-header :fixed.sync="navBarFixed" :threshold="100">
        <Navbar :class="{ 'NavBar--fixed': navBarFixed }"/>
      </fixed-header>
    </header>
    <main>
      <ReactiveBase
        class-name="ReactiveBase"
        app="artifact_news"
        url="http://localhost:9200"
        :theme="defaultTheme"
      >
        <nuxt/>
      </ReactiveBase>
    </main>
  </div>
</template>

<script>
import Navbar from '~/components/common/Navbar'
import Menu from '~/components/common/Menu'
import FixedHeader from 'vue-fixed-header'
import { defaultTheme } from '~/config/constants'

export default {
  name: 'DefaultLayout',
  components: {
    Navbar,
    Menu,
    FixedHeader
  },
  data() {
    return {
      navBarFixed: false
    }
  },
  computed: {
    defaultTheme() {
      return defaultTheme
    }
  }
}
</script>


<style>
html,
body {
  box-sizing: border-box;
  height: 100%;
}
html {
  font-family: 'Vollkorn', serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
}

#main-wrapper {
  overflow: hidden;
  position: relative;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.ReactiveBase {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.Page {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 100%;
  max-width: 66.6rem;
}

/* Estilos globais */
.microtext {
  text-transform: uppercase;
  color: #aa0000;
  font-family: 'Cabin', sans-serif;
  font-size: 0.625rem;
}

a.microtext {
  text-decoration: none;
}

.Page__Title {
  margin: 1rem;
  color: #aa0000;
}

.Page__Label {
  color: #555555;
  display: block;
}
.SearchBar {
  margin: 2rem 0.5rem 1rem;
}

.SearchBar--home {
  margin: 25vh 1rem 15vh;
}

.SearchBar .SearchBar__Input {
  background-color: #fff;
}
</style>
