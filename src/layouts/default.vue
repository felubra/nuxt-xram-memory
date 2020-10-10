<template>
  <div id="main-wrapper">
    <div
      v-if="navBarFixed"
      class="spacer"
      :style="`height: ${spacerHeight}px`"
    />
    <Menu />

    <FixedHeader :fixed.sync="navBarFixed">
      <header class="MainHeader">
        <Navbar class="MainNavBar" />
      </header>
      <client-only>
        <resize-sensor @resize="setSpacerHeight" />
      </client-only>
    </FixedHeader>
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
import { getCookie, setCookie } from 'tiny-cookie'

export default {
  name: 'NewLayout',
  components: {
    Navbar,
    Footer,
    FixedHeader,
    Menu
  },
  data () {
    return {
      navBarFixed: false,
      spacerHeight: 80,
      ...mapState(['menuVisible'])
    }
  },
  head () {
    return {
      bodyAttrs: {
        'menu-visible': this.menuVisible()
      }
    }
  },
  mounted () {
    const isBot =
      navigator &&
      navigator.userAgent &&
      /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent)

    // Somente mostre a notificação se não for um robô a acessar a página e não houver um cookie de aceite
    if (!isBot && !getCookie('GDPR_cookie')) {
      this.$notify({
        title: 'Este site usa cookies',
        dangerouslyUseHTMLString: true,
        message: 'Nós usamos cookies para melhorar a sua experiência neste site. <br />Ao continuar, você concorda com isso.',
        position: 'bottom-right',
        duration: 0,
        type: 'info',
        onClose () {
          setCookie('GDPR_cookie', 'accepted', { expires: '2147483647s' })
        }
      })
    }
  },
  methods: {
    setSpacerHeight ({ height }) {
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
  /* Tamanho mínimo para evitar pulos ao mostrar a barra de navegação */
  min-height: 101px;
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
  font-weight: 500;
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

.v-label {
  font-family: $sans-serif;
  font-size: 14px;
  text-transform: uppercase;
}

.v-messages {
  font-family: $sans-serif;
}

.v-text-field > .v-input__control > .v-input__slot:after,
.v-text-field > .v-input__control > .v-input__slot:before {
  border: none;
}

.v-text-field > .v-input__control > .v-input__slot:before {
  border: solid 1px #ccc;
  border-color: #ccc !important;
}

.v-text-field  > .v-input__control > .v-input__slot:after {
  border: solid 1px $link-color-active;
  transform: scaleY(0)
}

.v-text-field.v-input--is-focused  > .v-input__control > .v-input__slot:after {
  transform: scaleY(1)
}

.theme--light.v-label.v-label--active {
  color: $link-color;
}

.v-text-field .v-label {
  top: -12px;
  font-size: 14px;
  color: #a1a1a1 !important;
  transition: color .2s ease;
}

.v-text-field .v-label--active {
  transform: none;
  color: $link-color !important;
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
