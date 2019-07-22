<template>
  <div class="Navbar">
    <div class="inner">
      <Logo
        v-if="showLogo !== false"
        :class="`Navbar__Logo Navbar__Logo--display-${showLogo} Navbar__Logo--search-status--${isNavBarSearching}`"
      />
      <nav v-if="!isNavBarSearching">
        <div v-dragscroll.x="true" class="main-itens">
          <nuxt-link
            v-for="(page, index) in pageLinks()"
            :key="index"
            class="Navbar__Item"
            :to="urlOrRoute(page)"
          >{{page.title}}</nuxt-link>
          <no-ssr>
            <resize-sensor @resize="determineObfuscation"></resize-sensor>
          </no-ssr>
        </div>
        <div class="controls">
          <a
            v-if="isMenuItensObfuscated"
            class="Navbar__Item Navbar__Item--menu-toggle"
            href="#main-menu"
            @click.prevent="menuToggle"
          >
            <i class="material-icons">more_horiz</i>
          </a>
          <nuxt-link
            v-for="(page, index) in pageLinks('menu-controls')"
            :key="index"
            class="Navbar__Item"
            :to="urlOrRoute(page)"
          >
            <i class="material-icons">{{page.icon}}</i>
          </nuxt-link>
        </div>
      </nav>
      <div v-else class="search-box">
        <input
          ref="searchBox"
          v-model="searchInput"
          type="text"
          placeholder="Digite o que deseja pesquisar"
          @keydown.esc="hideSearch"
          @keydown.backspace="hideSearchIfEmpty"
          @keydown.enter="doSearch"
        />
        <a
          class="Navbar__Item"
          href="#search"
          :class="{isNavBarSearching: 'active'}"
          @click.prevent="searchToggleOrSearch"
        >
          <i class="material-icons">search</i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '@/components/nav/Logo'
import { mapActions, mapState, mapGetters } from 'vuex'
import { urlOrRoute } from '@/utils/'
import ClickOutside from 'vue-click-outside'
import { dragscroll } from 'vue-dragscroll'
export default {
  name: 'Navbar',
  components: {
    Logo
  },
  directives: {
    ClickOutside,
    dragscroll
  },
  props: {
    showLogo: {
      type: [String, Boolean],
      default: 'auto',
      validator(value) {
        return [
          true, //exiba o logotipo sempre
          false, //esconda o logotipo sempre
          'auto', // mostre o logotipo se houver espaço
          'mobile', // sempre mostre o logo apenas em mobile
          'desktop' // sempre mostre o logo em desktop
        ].includes(value)
      }
    }
  },
  data() {
    return {
      searchInput: '',
      isMenuItensObfuscated: false
    }
  },
  computed: {
    ...mapState(['isNavBarSearching']),
    ...mapGetters(['pageLinks'])
  },

  methods: {
    menuToggle() {
      this.toggleMenu()
    },
    searchToggleOrSearch() {
      if (this.searchInput.trim()) {
        this.doSearch()
      } else {
        this.hideSearch()
      }
    },
    doSearch() {
      // TODO:
    },
    hideSearchIfEmpty({ target }) {
      if (!target.value) {
        this.hideSearch()
      }
    },
    showSearch() {
      this.toggleSearch()
      this.$nextTick(() => {
        this.$refs.searchBox.focus()
      })
    },
    determineObfuscation({ width }) {
      const container = document.querySelector('div.main-itens')
      this.isMenuItensObfuscated =
        width < ((container && container.scrollWidth) || 0)
    },

    urlOrRoute,
    ...mapActions(['toggleMenu', 'hideMenu', 'hideSearch', 'toggleSearch'])
  }
}
</script>

<style lang="stylus" scoped>
.Navbar {
  font-family: $menu-font;
  font-size: $text-size;
  border-bottom: solid 1px #F1EAEA;
  z-index: 900;
}

.Navbar[fixed] {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: $bg-color;
}

.Navbar > div.inner {
  max-width: $max-width;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

nav {
  width: 100%;
  position: relative;
  justify-content: flex-end;
}

nav, .main-itens, .controls {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.main-itens, .controls {
  align-self: stretch;
}

.main-itens {
  overflow: hidden;
  margin: 0 auto;
}

input {
  font-style: italic;
  font-weight: normal;
  font-size: 22px;
  border: none;
  outline: none;
  margin: 20px 6px 20px 0;
  width: 100%;
  line-height: 20px;
  background: transparent;
}

.controls {
  min-width: 48px;
  align-items: flex-end;
  justify-content: flex-end;
}

.Navbar__Item {
  display: inline-block;
  margin: 0 10px;
  padding: 20px 0;
  color: $text-color-inactive;
  text-align: center;
}

.Navbar__Item:hover, .Navbar__Item:focus, .Navbar__Item:active, .Navbar__Item.active, .nuxt-link-exact-active {
  color: $text-color;
  border-bottom: solid 2px #D84848;
}

.search-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.Navbar__Logo {
  text-align: center;
}

.Navbar__Logo--search-status--true {
  filter: grayscale(100);
  opacity: 0.22;
}

.Navbar__Item {
  align-self: stretch;
}

nav a {
  transition: all 0.25;
}

nav a.Navbar__Item:first-of-type {
  margin-left: 0;
}

.search-box a.Navbar__Item:last-of-type, nav a.Navbar__Item:last-of-type {
  margin-right: 0;
}

@media only screen and (min-width: $tablet) {
  .Navbar > div.inner {
    flex-direction: row;
    align-items: center;
  }

  .Navbar__Item {
    margin-top: 28px;
  }
}
</style>
