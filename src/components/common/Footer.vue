<template>
  <footer class="MainFooter">
    <Logo></Logo>
    <p>
      &copy; 2019 xRAM-Memory.
      <br>Todos os direitos reservados.
    </p>
    <nuxt-link v-for="(index, link) in footerLinks" :key="index">{{link.name}}</nuxt-link>
  </footer>
</template>

<script>
import Logo from './Logo'
import { mapGetters } from 'vuex'
export default {
  components: {
    Logo
  },
  computed: {
    footerLinks() {
      return this.pageLinks('menu-footer')
    },
    ...mapGetters(['pageLinks'])
  }
}
</script>

<style scoped>
.MainFooter {
  color: #333333;
  width: 100%;
  max-width: $max-width;
}

.MainFooter > a {
  font-family: 'Cabin', sans-serif;
  font-size: 0.75rem;
  line-height: 0.93rem;
  text-transform: uppercase;
  color: #666666;
}

.MainFooter > a:first-child {
  margin-top: 1rem;
}

@media only screen and (min-width: 768px) {
  .MainFooter {
    text-align: right;
  }
}
</style>
