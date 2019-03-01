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
      return {
        typography: {
          fontFamily: 'Vollkorn, serif',
          fontSize: '16px'
        },

        colors: {
          textColor: '#333333',
          backgroundColor: '#fff',
          primaryTextColor: '#AA0000',
          primaryColor: '#2196F3',
          titleColor: '#AA0000',
          alertColor: '#d9534f',
          borderColor: '#B9B9B9'
        }
      }
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
.FilterList {
  background: #f3f1f1;
  padding: 12px;
}
.FilterList .FilterList__FilterItem button {
  border: none;
  border-bottom: solid 1px #a1a1a1;
  background: transparent;
  font-family: 'Volkorn', serif;
  font-size: 1rem;
  font-style: italic;
}

.FilterList .FilterList__FilterItem ul > li {
  font-family: 'Volkorn', serif;
  font-size: 1rem;
}

.FilterList .FilterList__FilterItem h2 {
  font-size: 0.875rem;
}

.FilterList .FilterList__FilterItem .FilterItem__DropdownList {
  background: #f3f1f1;
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
  margin: 1rem 0.5rem;
}

.SearchBar--home {
  margin: 25vh 1rem 15vh;
}

.SearchBar .SearchBar__Input {
  background-color: #fff;
}

.FilterList__FilterItem {
  margin: 0.5rem 0;
}

.FilterList__SelectedFilters {
  font-family: 'Cabin', sans-serif;
  font-size: 0.625rem;
}
.FilterList__SelectedFilter {
  background: #dfdfdf !important;
  margin: 0.5rem 0.5rem 0.2rem 0 !important;
}

.FilterList__Slider .vue-slider-component .vue-slider-process {
  background-color: #aa0000 !important;
}
</style>
