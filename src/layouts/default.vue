<template>
  <div id="main-wrapper">
    <header>
      <Menu/>
      <fixed-header :fixed.sync="navBarFixed" :threshold="100">
        <Navbar :class="{ 'NavBar--fixed': navBarFixed }"/>
      </fixed-header>
    </header>
    <nuxt/>
  </div>
</template>

<script>
import Navbar from '~/components/common/Navbar'
import Menu from '~/components/common/Menu'
import FixedHeader from 'vue-fixed-header'

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
  computed: {}
}
</script>


<style>
a {
  color: rgb(202, 175, 175);
  transition: color 0.25 ease;
}

a.active,
a:active,
a:focus,
a:hover {
  color: #ce5454;
}

html,
body {
  box-sizing: border-box;
  height: 100%;
  background: #f3f1f1;
}
html {
  font-family: 'Vollkorn', serif;
  font-size: 16px;
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
  padding-top: 3.098rem;
}

.Page--bare {
  padding-top: 0;
}

.Page.Page--home > main {
  background: transparent;
}

.content-container {
  max-width: 55rem;
  margin: 0 auto;
  padding: 0.5rem;
  width: 100%;
}

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
  margin: 1rem 0 1rem;
  padding: 0 0.5rem;
  max-width: 40.5rem;
  align-self: center;
  width: 100%;
}

.SearchBar .SearchBar__Input {
  background-color: #fff;
}

.SearchResults {
  background: #e0e0e0;
  padding: 0.5rem 0.75rem;
  flex-grow: 1;
}

.SearchResults .SearchResults__Result {
  display: block;
  text-decoration: none;
  color: inherit;
  margin: 0.5rem 0;
}
.SearchResults .SearchResults__ResultsInfo {
  color: #555555;
  text-transform: uppercase;
  font-family: 'Cabin', sans-serif;
}

.SearchResults .SearchResults__ResultsInfo p {
  margin: 0.5rem 0 0;
  font-size: 0.75rem;
}

.SearchResults .SearchResults__List {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

@media only screen and (min-width: 768px) {
  html {
    font-size: 18px;
  }
  .Page--sidebar {
    flex-direction: row;
    padding-top: 0;
  }
  .SearchResults .SearchResults__Result {
    margin: 0.5rem;
  }
}
</style>
