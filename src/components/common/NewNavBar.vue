<template>
  <div class="NewNavBar">
    <div class="inner">
      <Logo
        v-if="showLogo !== false"
        :class="`NewNavBar__Logo NewNavBar__Logo--display-${showLogo} NewNavBar__Logo--search-status--${isNavBarSearching}`"
      />
      <nav v-if="!isNavBarSearching">
        <div v-dragscroll.x="true" class="main-itens">
          <nuxt-link
            v-for="(page, index) in pageLinks()"
            :key="index"
            class="NewNavBar__Item"
            :to="urlOrRoute(page)"
          >{{page.title}}</nuxt-link>
          <resize-sensor @resize="determineObfuscation"></resize-sensor>
        </div>
        <div class="controls">
          <a
            v-if="isMenuItensObfuscated"
            class="NewNavBar__Item NewNavBar__Item--menu-toggle"
            href="#main-menu"
            @click.prevent="menuToggle"
          >
            <i class="material-icons">more_horiz</i>
          </a>
          <a
            class="NewNavBar__Item"
            href="#search"
            :class="{isNavBarSearching: 'active'}"
            @click.prevent="showSearch"
          >
            <i class="material-icons">search</i>
          </a>
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
        >
        <a
          class="NewNavBar__Item"
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
import Logo from './Logo'
import { mapActions, mapState, mapGetters } from 'vuex'
import { urlOrRoute } from '@/utils/'
import ClickOutside from 'vue-click-outside'
import { dragscroll } from 'vue-dragscroll'
export default {
  name: 'NewNavBar',
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
.NewNavBar {
  font-family: $header-font;
  font-size: $text-size;
  border-bottom: solid 1px #F1EAEA;
}

.NewNavBar > div.inner {
  max-width: 1120px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 10px 16px 0;
}

nav {
  width: 100%;
  position: relative;
  justify-content: space-evenly;
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
  max-width: calc(80% - 48px);
  overflow: hidden;
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
}

.NewNavBar__Item {
  display: inline-block;
  margin: 0 20px;
  padding: 20px 0;
  color: $text-color-inactive;
}

.NewNavBar__Item:hover, .NewNavBar__Item:focus, .NewNavBar__Item:active, .NewNavBar__Item.active {
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

.NewNavBar__Logo--search-status--true {
  filter: grayscale(100);
  opacity: 0.22;
}

.NewNavBar__Item {
  align-self: stretch;
}

nav a {
  transition: all 0.25;
}

nav a.NewNavBar__Item:first-of-type {
  margin-left: 0;
}

.search-box a.NewNavBar__Item:last-of-type, nav a.NewNavBar__Item:last-of-type {
  margin-right: 0;
}

@media only screen and (min-width: $tablet) {
  .NewNavBar > div.inner {
    flex-direction: row;
    align-items: center;
  }

  .NewNavBar__Item {
    margin-top: 28px;
  }

  .NewNavBar__Logo {
    margin-right: 56px;
  }

  .main-itens {
    max-width: calc(100% - 48px);
  }
}
</style>
