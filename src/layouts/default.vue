<template>
  <div id="main-wrapper">
    <header>
      <fixed-header :fixed.sync="navBarFixed" :threshold="100">
        <Navbar />
      </fixed-header>
    </header>
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Navbar from '~/components/nav/Navbar'
import Footer from '~/components/common/Footer'
import FixedHeader from 'vue-fixed-header'
export default {
  name: 'Alt',
  components: {
    Navbar,
    Footer,
    FixedHeader
  },
  data() {
    return {
      navBarFixed: false
    }
  }
}
</script>


<style lang="stylus">
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
