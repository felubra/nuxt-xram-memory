<template>
  <footer class="MainFooter">
    <Logo variant="claro" />
    <p>
      &copy; 2019 xraM-Memory.
      <br />Todos os direitos reservados.
    </p>
    <nuxt-link
      v-for="(page, index) in footerLinks"
      :key="index"
      :to="urlOrRoute(page)"
    >{{page.title}}</nuxt-link>
  </footer>
</template>

<script>
import Logo from './Logo'
import { mapGetters } from 'vuex'
import { urlOrRoute } from '@/utils'
export default {
  components: {
    Logo
  },
  computed: {
    footerLinks() {
      return this.pageLinks('menu-footer')
    },
    ...mapGetters(['pageLinks'])
  },
  methods: {
    urlOrRoute
  }
}
</script>

<style lang="stylus" scoped>
.MainFooter {
  color: #333333;
  width: 100%;
  border-top: solid 1px #f1eaea;
  margin-top: auto;
  max-width: $max-width;
  margin: 0 auto;
  padding: 1rem 0;
  text-align: center;
  font-size: 14px;
}

.MainFooter > a {
  font-family: 'Cabin', sans-serif;
  font-size: $microtext;
  line-height: 0.93rem;
  text-transform: uppercase;
  color: #666666;
  display: block;
  margin: 6px 0;
}

.MainFooter > a:first-child {
  margin-top: 1rem;
}

@media only screen and (min-width: 768px) {
  .MainFooter > a {
    font-family: 'Cabin', sans-serif;
    font-size: $microtext;
    line-height: 0.93rem;
    text-transform: uppercase;
    color: #666666;
    display: inline-block;
    margin: 0 6px;
  }
}
</style>
