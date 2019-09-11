<template>
  <div id="main-wrapper">
    <div class="spacer" :style="`height: ${navBarFixed ? spacerHeight: 0}px`"></div>
    <Menu />

    <fixed-header :fixed.sync="navBarFixed">
      <header class="MainHeader">
        <Navbar class="MainNavBar" />
      </header>
      <client-only>
        <resize-sensor @resize="setSpacerHeight"></resize-sensor>
      </client-only>
    </fixed-header>
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Navbar from '~/components/nav/Navbar'
import Menu from '~/components/nav/Menu'
import Footer from '~/components/common/Footer'
import FixedHeader from 'vue-fixed-header'
import { mapState } from 'vuex'
import { isCookieEnabled, getCookie, setCookie, remove } from 'tiny-cookie'

export default {
  name: 'NewLayout',
  components: {
    Navbar,
    Footer,
    FixedHeader,
    Menu
  },
  head() {
    return {
      bodyAttrs: {
        'menu-visible': this.menuVisible()
      }
    }
  },
  data() {
    return {
      navBarFixed: false,
      spacerHeight: 80,
      ...mapState(['menuVisible'])
    }
  },
  mounted() {
    if (!getCookie('GDPR_cookie')) {
      this.$notify({
        title: 'Este site usa cookies',
        dangerouslyUseHTMLString: true,
        message: `Nós usamos cookies para melhorar a sua experiência neste site. <br />Ao continuar, você concorda com isso.`,
        position: 'bottom-right',
        duration: 0,
        type: 'info',
        onClose() {
          setCookie('GDPR_cookie', 'accepted', { expires: '2147483647s' })
        }
      })
    }
  },
  methods: {
    setSpacerHeight({ height }) {
      this.spacerHeight = height
    }
  }
}
</script>


<style lang="stylus">
.el-notification__content, .el-notification__title {
  font-family: $sans-serif;
}

.MainHeader {
  border-bottom: solid 1px #f1eaea;
  transition: all 0.25s ease;
}

.MainNavBar {
  position: relative;
  bottom: -1px;
}

.MainHeader[fixed] {
  position: fixed;
  width: 100%;
  background: #fbfafa;
  z-index: 900;
}

.FieldList > .FieldList__Field {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
}

.FieldList > .FieldList__Field > h2, .FieldList > .FieldList__Field > p {
  margin: 0;
}

.FieldList > .FieldList__Field > h2 {
  display: inline-block;
  color: #555;
  font-weight: bold;
  text-align: left;
  display: flex;
  font-family: $sans-serif;
  font-size: $microtext;
  text-transform: uppercase;
}

.FieldList .FieldList__Field figure {
  text-align: center;
  margin: 0.1rem;
}

.FieldList, .FieldList h2 {
  font-family: $sans-serif;
}

.FieldList .FieldList__Field a {
  word-break: break-all;
  display: inline-block;
}

body.page--index .MainHeader {
  border-color: transparent;
}

body.page--index .MainHeader[fixed] {
  border-color: #f1eaea;
}

body.page--index .Navbar__Logo {
  opacity: 0;
  pointer-events: none;
}

body.page--index .MainHeader[fixed] .Navbar__Logo {
  opacity: 1;
}

body.page--full-screen .MainHeader {
  position: fixed;
  opacity: 0;
  width: 100%;
}

body.page--full-screen .MainHeader[fixed] {
  opacity: 1;
}

@media only screen and (min-width: $tablet) {
  .FieldList > .FieldList__Field {
    flex-direction: row;
    align-items: center;
  }

  .FieldList > .FieldList__Field > h2 {
    width: 15%;
  }

  .FieldList > .FieldList__Field > * {
    width: 85%;
  }

  .FieldList > .FieldList__Field > h2 {
    margin: 0 1rem 0 0;
  }

  .FieldList > .FieldList__Field > p {
    margin: 0 1rem 0;
  }

  body.page--index .Navbar__Logo {
    opacity: 1;
    pointer-events: all;
  }
}
</style>
