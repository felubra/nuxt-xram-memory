<template>
  <footer class="MainFooter">
    <div class="innner">
      <Logo variant="claro" />
      <p class="copyright">
        &copy; 2019-20
        <strong>xraM-Memory</strong>
      </p>
      <p class="version">
        Versão {{ $utils.version }}
      </p>
      <p class="by">
        <a href="https://br.linkedin.com/in/felubra">Desenvolvido por Felipe Lube Bragança</a>
      </p>
      <div class="links">
        <nuxt-link
          v-for="(page, index) in footerLinks"
          :key="index"
          :to="urlOrRoute(page)"
        >
          {{ page.title }}
        </nuxt-link>
      </div>
    </div>
  </footer>
</template>

<script>
import Logo from '@/components/nav/Logo'
import { mapGetters } from 'vuex'
export default {
  components: {
    Logo
  },
  computed: {
    footerLinks () {
      return this.pageLinks('menu-footer')
    },
    ...mapGetters(['pageLinks'])
  },
  methods: {
    urlOrRoute (x) {
      return this.$utils.urlOrRoute(x)
    }
  }
}
</script>

<style lang="stylus" scoped>
.MainFooter {
  color: #333333;
  width: 100%;
  border-top: solid 1px #f1eaea;
  margin: auto auto 0;
  padding: 1rem 0;
  text-align: center;
  font-size: 16px;
}

.MainFooter > .inner {
  max-width: $max-width;
}

.MainFooter a {
  font-family: $sans-serif;
  font-size: 12px;
  line-height: 0.93rem;
  text-transform: uppercase;
  color: #666666;
  display: inline-block;
  margin: 6px 0;
}

.MainFooter p {
  margin: 5px;
}

.copyright {
  margin-bottom: 20px;
}

.links {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

p.version, p.by {
  font-family: $sans-serif;
  font-size: 12px;
}

p.by a {
  text-transform: none;
}

.MainFooter a:focus, .MainFooter a:active, .MainFooter a:hover {
  color: $link-color;
}

.MainFooter > a:first-child {
  margin-top: 1rem;
}

@media only screen and (min-width: 768px) {
  .MainFooter a {
    font-family: $sans-serif;
    line-height: 0.93rem;
    text-transform: uppercase;
    color: #666666;
    margin: 0 6px;
  }
  .links {
    flex-direction: row;
  }
}
</style>
