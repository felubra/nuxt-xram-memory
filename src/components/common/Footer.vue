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
          v-for="(page, index) in pageLinks('menu-footer')"
          :key="index"
          :to="$utils.urlOrRoute(page)"
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
  computed: mapGetters(['pageLinks'])
}
</script>

<style lang="stylus" scoped>
.MainFooter
  color: $text-color
  width: 100%
  border-top: solid 1px #f1eaea
  margin: auto auto 0
  padding: 1rem 0
  text-align: center
  font-size: 16px

.MainFooter > .inner
  max-width: $max-width

.MainFooter a
  font-family: $sans-serif
  font-size: 12px
  line-height: 0.93rem
  text-transform: uppercase
  color: $header-color
  display: inline-block
  margin: 6px 0
  @media only screen and (min-width: $tablet)
    font-family: $sans-serif
    line-height: 0.93rem
    text-transform: uppercase
    color: $header-color
    margin: 0 6px

.MainFooter p
  margin: 5px

.copyright
  margin-bottom: 20px

.links
  margin-top: 10px
  display: flex
  flex-direction: column
  justify-content: center
  @media only screen and (min-width: $tablet)
    flex-direction: row

p.version, p.by
  font-family: $sans-serif
  font-size: 12px

p.by a
  text-transform: none

.MainFooter a:focus
.MainFooter a:active
.MainFooter a:hover
  color: $link-color

.MainFooter > a:first-child
  margin-top: 1rem
</style>
