<template>
  <section class="Page Page--bare">
    <div class="centered">
      <Logo :big="true"/>
      <h1>{{title}}</h1>
      <nuxt-link to="/">Voltar à página inicial</nuxt-link>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/common/Logo'
export default {
  components: {
    Logo
  },
  computed: {
    title() {
      return this.error.statusCode === 404
        ? 'Página não encontrada'
        : 'Um erro aconteceu'
    }
  },
  head() {
    return {
      title: this.title,
      titleTemplate: 'xraM-Memory - %s',
      bodyAttrs: {
        class: 'Navbar--no-logo'
      }
    }
  },
  props: ['error']
}
</script>

<style scoped>
div.centered {
  align-self: center;
  margin: auto;
  text-align: center;
}
</style>
