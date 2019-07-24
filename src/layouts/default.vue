<template>
  <div id="main-wrapper">
    <div class="spacer" :style="`height: ${navBarFixed ? spacerHeight: 0}px`"></div>
    <fixed-header :fixed.sync="navBarFixed">
      <header class="MainHeader">
        <Navbar class="MainNavBar" />
      </header>
      <no-ssr>
        <resize-sensor @resize="setSpacerHeight"></resize-sensor>
      </no-ssr>
    </fixed-header>
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Navbar from '~/components/nav/Navbar'
import Footer from '~/components/common/Footer'
import FixedHeader from 'vue-fixed-header'
export default {
  name: 'NewLayout',
  components: {
    Navbar,
    Footer,
    FixedHeader
  },
  data() {
    return {
      navBarFixed: false,
      spacerHeight: 100
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
.MainHeader {
  border-bottom: solid 1px #f1eaea;
}

.MainNavBar {
  position: relative;
  bottom: -1px;
}

.MainHeader[fixed] {
  position: fixed;
  width: 100%;
  background: #fbfafa;
  z-index: 9999;
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
}
</style>
